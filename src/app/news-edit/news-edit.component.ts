import { Component, OnInit, Input } from '@angular/core';
import {RestService} from '../rest.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrls: ['./news-edit.component.css']
})
export class NewsEditComponent implements OnInit {

  @Input() newsData: any = {title: '', brief: '', content: '', date: '0000-00-00'};

  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router, private cookieService: CookieService) { }

  ngOnInit() {
    this.rest.getNews(this.route.snapshot.params['id']).subscribe((data: {}) => {
      this.newsData = data;
    });
  }

  updateNews() {
    this.rest.updateProduct( this.newsData).subscribe((result) => {
      this.router.navigate(['/news-list']);
    }, (err) => {
      console.log(err);
    });
  }

  isAuthenticated(): boolean {
    return this.cookieService.check('x-auth-token');
  }
}
