import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NewsApp';
  param = {value: 'world'};
  translate: TranslateService;

  constructor(translate: TranslateService, private router: Router) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');
    this.translate = translate;
  }

  setRuLang() {
    this.translate.use('ru').subscribe(res => {
      this.router.navigate([this.router.getCurrentNavigation()]);
    });
  }

  setEnLang() {
    this.translate.use('en').subscribe(res => {
      this.router.navigate([this.router.getCurrentNavigation()]);
    });
  }
}
