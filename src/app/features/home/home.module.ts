/**
 * Created by lmchuc on 7/3/2017.
 */

import { NgModule } from "@angular/core";
import { HomeComponent } from "./home.component";
import { SliderService } from "./home.service";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
@NgModule({
  imports: [CommonModule,
    RouterModule
  ],
  declarations: [
    HomeComponent
  ],
  exports: [
    HomeComponent
  ],
  providers: [
    SliderService
  ]
})

export class HomeModule {}
