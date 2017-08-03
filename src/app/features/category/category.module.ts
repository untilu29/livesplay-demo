/**
 * Created by lmchuc on 8/1/2017.
 */
import {NgModule} from '@angular/core';
import {CategoryComponent} from './category.component';
import {CommonModule} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {CategoryService} from "./category.service";
import {RouterModule} from "@angular/router";
@NgModule({
  imports: [CommonModule, NgxPaginationModule, RouterModule],
  declarations: [
    CategoryComponent
  ],
  exports: [
    CategoryComponent
  ],
  providers: [CategoryService],
})

export class CategoryModule {
}
