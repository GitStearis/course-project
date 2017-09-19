import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AdminService } from "../../services/admin/admin.service";
import { AuthService } from "../../services/auth/auth.service";
import {
  NG_TABLE_DIRECTIVES,
  NgTableComponent,
  NgTableFilteringDirective,
  NgTablePagingDirective,
  NgTableSortingDirective
} from "ng2-table/ng2-table";
import "rxjs/add/operator/toPromise";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit {
  public TableData: Array<any> = [];
  public data: Array<any>;
  public length: number = 0;

  public rows: Array<any> = [];
  public columns: Array<any> = [
    {
      title: "Email",
      name: "email",
      filtering: { filterString: "", placeholder: "Filter by email" }
    },
    {
      title: "Permission",
      name: "permission",
      sort: "",
      filtering: { filterString: "", placeholder: "Filter by permission" }
    },
    {
      title: "Block",
      name: "isBlocked",
      sort: ""
    },
    { title: "Registration date", className: "text-warning", name: "date" }
  ];

  public config: any = {
    paging: true,
    sorting: { columns: this.columns },
    filtering: { filterString: "" },
    className: ["table-striped", "table-bordered"]
  };

  constructor(
    private http: HttpClient,
    public admin: AdminService,
    public auth: AuthService
  ) {}

  public setRowClickEvent() {
    $("#resultDataTable").off("click", "tr");
    $("#resultDataTable").on("click", "tr", function(event: any) {
      event.preventDefault();
      $(this).toggleClass("success");
    });
  }

  public async getUserList(): Promise<any> {
    let response = await this.http.get("/api/userlist").toPromise();
    return JSON.parse(JSON.stringify(response));
  }

  async ngOnInit() {
    this.data = await this.getUserList();
    console.log(this.data);
    this.length = this.data.length;
    console.log(this.length);
    this.onChangeTable(this.config);
  }

  public onChangeTable(config: any): any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    let filteredData = this.changeFilter(this.data, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rows = sortedData;
    this.length = sortedData.length;

    this.setRowClickEvent();
  }

  public changeFilter(data: any, config: any): any {
    let filteredData: Array<any> = data;
    this.columns.forEach((column: any) => {
      console.log(column.filtering)
      if ((column.filtering) && (column.filtering !== undefined)) {
        filteredData = filteredData.filter((item: any) => {
          // console.log(item, column.name)
          return item[column.name].match(column.filtering.filterString);
        });
      }
    });

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item: any) =>
        item[config.filtering.columnName].match(
          this.config.filtering.filterString
        )
      );
    }

    let tempArray: Array<any> = [];

    filteredData.forEach((item: any) => {
      let flag = false;
      this.columns.forEach((column: any) => {
        if (
          item[column.name].toString().match(this.config.filtering.filterString)
        ) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;

    return filteredData;
  }

  public changeSort(data: any, config: any): any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName: string = void 0;
    let sort: string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== "" && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous: any, current: any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === "desc" ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === "asc" ? -1 : 1;
      }
      return 0;
    });
  }

  public selectedRows: Array<number> = [];
  public selectedUser: string = "";
  public userImage: string = "";

  public onCellClick(data: any): any {
    this.selectedUser = data.row.email;
    console.log(`Selected user: ${this.selectedUser}`);
    this.userImage = data.row.passport;
    console.log(`Scan url: ${this.userImage}`);
    let row = data.row.email;
    if (!this.selectedRows.includes(row)) {
      this.selectedRows.push(row);
    } else {
      this.selectedRows.splice(this.selectedRows.indexOf(row), 1);
    }
    console.log(this.selectedRows);
  }

  public deleteUsers() {
    // add localStorage user's data deleting if self deleting
    this.http.post("/api/deleteUsers", this.selectedRows).subscribe(
      async data => {
        console.log(data);
        await this.userList();
        this.onChangeTable(this.config);
      },
      err => console.log("smth wrong")
    );
    this.selectedRows = [];
  }

  public async blockUsers() {
    this.http.post("/api/blockUsers", this.selectedRows).subscribe(
      async data => {
        console.log(data);
        await this.userList();
        this.onChangeTable(this.config);
      },
      err => console.log("smth wrong")
    );
    this.selectedRows = [];
  }

  public unblockUsers() {
    this.http.post("/api/unblockUsers", this.selectedRows).subscribe(
      async data => {
        console.log(data);
        await this.userList();
        this.onChangeTable(this.config);
      },
      err => console.log("smth wrong")
    );
    this.selectedRows = [];
  }

  public async userList() {
    const response = await fetch("/api/userlist");
    const json = await response.json();
    this.data = json;
    console.log(json);
  }

  public confirmUser(event: any) {
    this.http.post("/api/confirm", {user: event.target.value})
    .subscribe( async data => {
      console.log(data);
      await this.userList();
      this.onChangeTable(this.config);
    })
  }
}
