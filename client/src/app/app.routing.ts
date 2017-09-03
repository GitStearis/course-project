import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./components/home/home.component";
import { UserComponent } from "./components/user/user.component";
import { ProjectComponent } from "./components/project/project.component";
import { NotfoundComponent } from "./components/notfound/notfound.component";

const appRoutes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "user",
    component: UserComponent
  },
  {
    path: "project",
    component: ProjectComponent
  },
  {
    path: "**",
    component: NotfoundComponent
  }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
