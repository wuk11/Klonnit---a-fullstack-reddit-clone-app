import { Routes } from '@angular/router';
import { FrontPageComponent } from './front-page/front-page.component';
import { FrontPageRandomComponent } from './front-page-random/front-page-random.component';

export const routes: Routes = [
  { path: '', component: FrontPageRandomComponent },
  {
    path: 'community/main',
    loadComponent: async () => {
      const m = await import('./front-page/front-page.component');
      return m.FrontPageComponent;
    },
  },
  {
    path: 'community/:id',
    loadComponent: async () => {
      const m = await import('./community-page/community-page.component');
      return m.CommunityPageComponent;
    },
  },
  {
    path: 'community/:communityId/article/:id',
    loadComponent: async () => {
      const m = await import('./article-page/article-page.component');
      return m.ArticlePageComponent;
    },
  },
  {
    path: 'login',
    loadComponent: async () => {
      const m = await import('./login-page/login-page.component');
      return m.LoginPageComponent;
    },
  },
  {
    path: 'register',
    loadComponent: async () => {
      const m = await import('./register-page/register-page.component');
      return m.RegisterPageComponent;
    },
  },
  {
    path: 'createCommunity',
    loadComponent: async () => {
      const m = await import(
        './create-community-page/create-community-page.component'
      );
      return m.CreateCommunityPageComponent;
    },
  },
  {
    path: 'community/:communityId/createArticle',
    loadComponent: async () => {
      const m = await import(
        './create-article-page/create-article-page.component'
      );
      return m.CreateArticlePageComponent;
    },
  },
  {
    path: 'profile',
    loadComponent: async () => {
      const m = await import('./profile-page/profile-page.component');
      return m.ProfilePageComponent;
    },
  },
];
