import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./components/home/home.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { ProjectComponent } from "./components/project/project/project.component";
import { NotfoundComponent } from "./components/notfound/notfound.component";
import { AdminComponent } from "./components/admin/admin.component";
import { CreateComponent } from './components/project/create/create.component';

const appRoutes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "profile",
    component: ProfileComponent
  },
  {
    path: "admin", 
    component: AdminComponent
  },
  {
    path: "project",
    component: ProjectComponent
  },
  {
    path: "create",
    component: CreateComponent
  },
  {
    path: "**",
    component: NotfoundComponent
  }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
