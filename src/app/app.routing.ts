/* tslint:disable: max-line-length */
import { Routes } from '@angular/router';

import { DashboardComponent } from './features/dashboard.component';
import { NotFound404Component } from './not-found404.component';
import {HomeComponent} from "./features/home/home.component";
import {DetailComponent} from "./features/detail/detail.component";
import {CategoryComponent} from "./features/category/category.component";

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'detail', component: DetailComponent, pathMatch: 'full' },
  { path: 'video/:slug', component: DetailComponent, pathMatch: 'full' },
  { path: 'category', component: CategoryComponent, pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, pathMatch: 'full' },
  { path: 'dashboard/:id', component: DashboardComponent, pathMatch: 'full' },
  { path: 'lazy', loadChildren: './features/lazy/index#LazyModule' },
  { path: '**', component: NotFound404Component }
];
