/**
 * Created by lmchuc on 7/3/2017.
 */

import {
   AfterViewInit, Component, OnInit
} from "@angular/core";
import {Slider, Video} from "./home.model";
import {SliderService} from "./home.service";
import * as moment from 'moment';

declare var $: any;

@Component({
  selector: 'home',
  templateUrl: 'home.component.html',
  // styleUrls: ['home.component.scss']
})

export class HomeComponent implements OnInit, AfterViewInit  {
  sliders: Slider[] = [];
  videos: Video[] = [];

  constructor (private sliderService: SliderService) {}
  ngOnInit() {
    // this.sliderService.getSliders().
    // subscribe(data => this.sliders = data);
    this.sliderService.getTopVideos().
      subscribe(data => this.videos = data);
  }

  convertTime(timestamp: number): string {
    return moment(timestamp).locale('vi').format('DD MMMM YYYY');
  }

  ngAfterViewInit(): void {

  }

  slideCarouselOwl() {
    if (typeof window !== 'undefined') {
      /*-----------------------------------------
       Header Slider
       -----------------------------------------*/
      $('#banner-slider').owlCarousel({
        singleItem: true,
        slideSpeed: 200,
        autoPlay: 3000,
        stopOnHover: true,
        navigation: false,
        pagination: true,
        paginationNumbers: true,
      });
    }
  }

  videoCarouselOwl() {
    if (typeof window !== 'undefined') {
      /*-----------------------------------------
       Video Carousel
       -----------------------------------------*/
      $('.video-carousel').owlCarousel({
        items: 4,
        itemsDesktop: [1199, 4],
        itemsDesktopSmall: [991, 3],
        itemsTablet: [767, 3],
        itemsMobile: [479, 1],
        slideSpeed: 200,
        navigation: true,
        navigationText: ['<i class=\"fa fa-angle-left\"></i>',
          '<i class=\"fa fa-angle-right\"></i>'],
        pagination: false,
      });

      /*-----------------------------------------
       Magnific Popup
       -----------------------------------------*/
      $('.image-large').magnificPopup({
        type: 'image',
        gallery: {
          enabled: true
        }
      });
      $('.play-video').magnificPopup({
        type: 'iframe'
      });
      $.extend(true, $.magnificPopup.defaults, {
        iframe: {
          patterns: {
            youtube: {
              index: 'youtube.com/',
              id: 'v=',
              src: 'http://www.youtube.com/embed/%id%?autoplay=1'
            }
          }
        }
      });
    }
  }
}
