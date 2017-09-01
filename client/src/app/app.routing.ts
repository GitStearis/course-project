import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./components/home/home.component";
import { UserComponent } from "./components/user/user.component";

const appRoutes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "/",
    component: HomeComponent
  },
  {
    path: "user", 
    component: UserComponent
  },
  {
    path: "**",
    redirectTo: ""
  }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
