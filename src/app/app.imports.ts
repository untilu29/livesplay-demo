import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, PreloadAllModules } from '@angular/router';

import { EffectsModule } from '@ngrx/effects';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { useLogMonitor } from '@ngrx/store-log-monitor';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TransferHttpModule } from '../modules/transfer-http/transfer-http.module';

import { rootReducer } from './reducers';
import { StoreDevToolsModule } from './features/store-devtools.module';
import { UserEffects } from './user/user.effects';
import { HomeModule } from './features/home/home.module';
import { DetailModule } from './features/detail/detail.module';
import { CategoryModule } from './features/category/category.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {BlockUIModule} from "ng-block-ui";
import {ToastrModule} from "ngx-toastr";

const STORE_DEV_TOOLS_IMPORTS = [];
if (ENV === 'development' && !AOT &&
  ['monitor', 'both'].includes(STORE_DEV_TOOLS) // set in constants.js file in project root
) STORE_DEV_TOOLS_IMPORTS.push(...[
  StoreDevtoolsModule.instrumentStore({
    monitor: useLogMonitor({
      visible: true,
      position: 'right'
    })
  })
]);

export const APP_IMPORTS = [
  EffectsModule.run(UserEffects),
  NgbModule.forRoot(),
  ReactiveFormsModule,
  RouterStoreModule.connectRouter(),
  StoreModule.provideStore(rootReducer),
  STORE_DEV_TOOLS_IMPORTS,
  StoreDevToolsModule,
  TransferHttpModule,
  BlockUIModule,
  ToastrModule.forRoot(),
  ModalModule.forRoot(),
  BsDropdownModule.forRoot(),
  CollapseModule.forRoot(),
  HomeModule,
  DetailModule,
  CategoryModule,
];
