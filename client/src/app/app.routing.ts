import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProjectComponent } from './components/project/project/project.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AdminComponent } from './components/admin/admin.component';
import { CreateComponent } from './components/project/create/create.component';
import { UserComponent } from './components/user/user.component';
import { VerificationPageComponent } from './components/verification-page/verification-page.component';
import { CheckingComponent } from './components/checking/checking.component';
import { CreatedProjectsComponent } from './components/created-projects/created-projects.component';
import { DonationComponent } from './components/donation/donation.component';
import { CreateNewsComponent } from './components/news/create-news/create-news.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'verify/:token',
    component: VerificationPageComponent
  },
  {
    path: 'user/:username',
    component: UserComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'check',
    component: CheckingComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'project/:pageId',
    component: ProjectComponent
  },
  {
    path: 'project/:pageId/donate',
    component: DonationComponent
  },
  {
    path: 'project/:pageId/news',
    component: CreateNewsComponent
  },
  {
    path: 'user/:name/created',
    component: CreatedProjectsComponent
  },
  {
    path: 'create',
    component: CreateComponent
  },
  {
    path: '404',
    component: NotfoundComponent
  },
  {
    path: '**',
    component: NotfoundComponent
  }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
