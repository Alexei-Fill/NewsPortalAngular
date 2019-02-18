import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {RestService} from './rest.service';
import {CookieService} from 'ngx-cookie-service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NewsApp';
  param = {value: 'world'};
  translate: TranslateService;
  currentUser: string;


  constructor(translate: TranslateService, private router: Router, public rest: RestService, public cookieService: CookieService) {
    this.currentUser = sessionStorage.getItem('currentUser');
    console.log(this.currentUser);
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

  logOut() {
    this.rest.logout().subscribe((result) => {
      sessionStorage.removeItem('currentUser');
      this.cookieService.delete('auth-token');
      this.router.navigate(['/news-list']);
      window.location.reload();
    }, (err) => {
      console.log(err);
    });
  }
}
