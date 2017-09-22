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
import { CreatedProjectsComponent } from './components/project/created-projects/created-projects.component';
import { DonationComponent } from './components/donation/donation.component';
import { CreateNewsComponent } from './components/news/create-news/create-news.component';
import { AllNewsComponent } from './components/news/all-news/all-news.component';
import { NewsComponent } from './components/news/news/news.component';
import { AllProjectsComponent } from './components/project/all-projects/all-projects.component';
import { AllProjectNewsComponent } from './components/news/all-project-news/all-project-news.component';
import { RatedProjectsComponent } from './components/project/rated-projects/rated-projects.component';
import { FollowedProjectsComponent } from './components/project/followed-projects/followed-projects.component';

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
    path: 'projects',
    component: AllProjectsComponent
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
    component: AllProjectNewsComponent
  },
  {
    path: 'project/:pageId/news/create',
    component: CreateNewsComponent
  },
  {
    path: 'user/:name/created',
    component: CreatedProjectsComponent
  },
  {
    path: 'user/:name/rated',
    component: RatedProjectsComponent
  },
  {
    path: 'user/:name/followed',
    component: FollowedProjectsComponent
  },
  {
    path: 'create',
    component: CreateComponent
  },
  {
    path: 'news',
    component: AllNewsComponent 
  },
  {
    path: 'news/:newsId',
    component: NewsComponent
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
