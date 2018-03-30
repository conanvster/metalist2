import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  constructor(private router: Router, private translate: TranslateService) {
    translate.addLangs(['ru', 'uk']);
    translate.setDefaultLang('uk');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/ru|uk/) ? browserLang : 'uk');
  }
}
