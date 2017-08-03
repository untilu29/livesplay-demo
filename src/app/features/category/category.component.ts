/**
 * Created by lmchuc on 8/1/2017.
 */
import {Component, OnInit} from '@angular/core';
import {CategoryService} from "./category.service";
import {Video} from "../home/home.model";
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'category',
  templateUrl: 'category.component.html',
  styleUrls: ['category.component.scss']
})

export class CategoryComponent implements OnInit {
  videos: Video[];
  page: number;
  perPage: number;
  count: number;

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.getVideoPaginate(1);
  }

  getVideoPaginate(page: number) {
    this.categoryService.getAllVideos(page)
      .subscribe(res => {
          this.count = res.count;
          this.perPage = res.perPage;
          this.videos = res.data;
          this.page = page;
        },
        error => console.log(error)
      );
  }

  convertTime(timestamp: number): string {
    return moment(timestamp).locale('vi').format('DD MMMM YYYY');
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
