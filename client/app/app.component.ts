import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private router: Router) {}
  ngOnInit(){
    this.router.events
      .subscribe(event => {
        // console.log('event', event);
      });
  }
}
