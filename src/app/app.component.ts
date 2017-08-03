import {
  Component, OnInit,
  ViewEncapsulation
} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import { TransferState } from '../modules/transfer-state/transfer-state';

import { views } from './app-nav-views';
import {APP_NAME, MOBILE} from './services/constants';
import { FormBuilder, FormGroup } from '@angular/forms';
import {Meta, Title} from "@angular/platform-browser";
declare var $: any;

@Component({
  selector: 'my-app',
  styleUrls: ['main.scss', './app.component.scss'],
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit {
  showMonitor = (ENV === 'development' && !AOT &&
    ['monitor', 'both'].includes(STORE_DEV_TOOLS) // set in constants.js file in project root
  );
  mobile = MOBILE;
  views = views;
  form: FormGroup;

  constructor(
    private cache: TransferState,
    public route: ActivatedRoute,
    public router: Router,
    private title: Title,
    private meta: Meta,
    formBuilder: FormBuilder,
  ) {
    this.form = formBuilder.group({
      search: [],
    });
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
          return;
        }
        this.title.setTitle(APP_NAME);
        this.meta.removeTag("name='video'");
        this.meta.removeTag("name='description'");
        this.meta.removeTag("name='author'");
        this.meta.removeTag("name='keyword'");
        window.scrollTo(0, 0);
      });
    }
  }

  activateEvent(event) {
    if (ENV === 'development') {
      console.log('Activate Event:', event);
    }
  }

  deactivateEvent(event) {
    if (ENV === 'development') {
      console.log('Deactivate Event', event);
    }
  }
}
