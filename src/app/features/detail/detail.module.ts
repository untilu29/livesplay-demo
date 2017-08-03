/**
 * Created by lmchuc on 8/1/2017.
 */
import {NgModule} from '@angular/core';
import {DetailComponent} from './detail.component';
import {DetailService} from "./detail.service";
import {CommonModule} from "@angular/common";
import {SliderService} from "../home/home.service";
import {RouterModule} from "@angular/router";
@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [
    DetailComponent
  ],
  exports: [
    DetailComponent
  ],
  providers: [DetailService, SliderService]
})

export class DetailModule {
}
