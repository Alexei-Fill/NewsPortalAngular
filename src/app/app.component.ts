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
  translate: TranslateService;
  currentUser: string;

  constructor(translate: TranslateService, private router: Router, public rest: RestService, public cookieService: CookieService) {
    translate.setDefaultLang('en');
    translate.use('en');
    this.translate = translate;
    if (this.isAuthenticated()) {
      this.currentUser = sessionStorage.getItem('currentUser');
    } else {
      sessionStorage.removeItem('currentUser');
      this.currentUser = null;
      }
    }

  setRuLang() {
    this.translate.use('ru').subscribe(res => {
    });
  }

  setEnLang() {
    this.translate.use('en').subscribe(res => {
    });
  }

  logOut() {
    this.rest.logout().subscribe((result) => {
      this.cookieService.delete('x-auth-token');
      this.router.navigate(['/news-list']);
      window.location.reload();
    }, (err) => {
      console.log(err);
    });
  }

  isAuthenticated(): boolean {
    return this.cookieService.check('x-auth-token');
  }
}
