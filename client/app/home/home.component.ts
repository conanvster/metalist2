import { Component, OnInit } from '@angular/core';
import { MatchEditorService } from '../services/match-editor.service';
import 'rxjs/add/operator/map';
import 'swiper/dist/js/swiper.js';
import { fromEvent } from 'rxjs/observable/fromEvent';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  matches: any = [];
  config: SwiperOptions = {
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    pagination: '.swiper-pagination',
    watchSlidesProgress: false,
    paginationHide: true,
    breakpoints: {
      860: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      1290: {
        slidesPerView: 2,
        spaceBetween: 30
      },
    },
    slidesPerView: 3,
    spaceBetween: 40,
  };
  isMobile: boolean;
  constructor(private matchEditorService: MatchEditorService) { }

  ngOnInit() {
    this.loadMatches();
    this.isMobile = window.innerWidth <= 860;
    fromEvent(window, 'resize').map((event: any) => {
      this.isMobile = event.target.innerWidth <= 860;
    }).subscribe();
  }

  loadMatches() {
    return this.matchEditorService.loadNextMatches()
      .map(matches => this.matches = matches).subscribe();
  }
}
