import { Component, OnInit, Input } from '@angular/core';
import {RestService} from '../rest.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-news-add',
  templateUrl: './news-add.component.html',
  styleUrls: ['./news-add.component.css']
})
export class NewsAddComponent implements OnInit {
  @Input() newsData = {title: '', brief: '', content: '', date: ''};
  currentUser: string;


  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router,  private cookieService: CookieService) { }

  ngOnInit() {
  }

  addNews() {
    this.rest.addNews(this.newsData).subscribe((result) => {
      this.router.navigate(['/news-list']);
    }, (err) => {
      console.log(err.status);
    });
  }

  isAuthenticated(): boolean {
    return this.cookieService.check('x-auth-token');
  }

}
