/**
 * Created by lmchuc on 8/1/2017.
 */
import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DetailService} from "./detail.service";
import {Video} from "../home/home.model";
import * as moment from 'moment';
import {SliderService} from "../home/home.service";
import {Meta, Title} from "@angular/platform-browser";
import {APP_NAME} from "../../services/constants";
declare var $: any;

@Component({
  selector: 'detail-page',
  templateUrl: 'detail.component.html'
})

export class DetailComponent implements OnInit {
  video: Video = new Video();
  videos: Video[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private detailService: DetailService,
              private sliderService: SliderService,
              private title: Title,
              private meta: Meta) {
    this.route.params.subscribe(params => {
      this.detailService.getVideoDetail(params['slug'])
        .subscribe((video: Video) => {
          this.video = video;
          this.title.setTitle(APP_NAME + ' - ' + video.name);
          this.meta.addTags([
            {
              name: 'video',
              content: video.name
            },
            {
              name: 'author',
              content: video.authors.map((el) => el.name).join(', ')
            },
            {
              name: 'description',
              content: video.description
            },
            {
              name: 'keyword',
              content: video.name + ', '
              + video.genres.map((el) => el.name).join(', ')
              + video.authors.map((el) => el.name).join(', ')
            }
            ]);
          },
          error => this.router.navigate(['/404']));
    });
  }

  ngOnInit(): void {
    this.sliderService.getTopVideos().subscribe(data => this.videos = data);
  }

  convertTime(timestamp: number): string {
    return moment(timestamp).locale('vi').format('DD MMMM YYYY');
  }

  convertDuration(duration: number): number {
    return moment.duration(duration).asMinutes();
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
