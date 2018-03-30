import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment-timezone';
import {TranslateService} from '@ngx-translate/core';

@Pipe({name: 'localeDate'})

export class LocaleDatePipe implements PipeTransform {
  browserLang: string;
  constructor(private translate: TranslateService) {
    this.browserLang = translate.getBrowserLang();
    this.browserLang = ['ru', 'uk'].includes(this.browserLang) ? this.browserLang : 'uk';
  }
  transform(value: Date, format: string = 'DD MMMM YYYY HH:mm'): string {
    return value ? moment(value).locale(this.browserLang).tz('Europe/Kiev').format(format) : null;
  }
}
