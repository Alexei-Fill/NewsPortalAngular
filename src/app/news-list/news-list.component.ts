import { Component, OnInit } from '@angular/core';
import {RestService} from '../rest.service';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {

  newsList: any = [];
  deletedNews: number[] = [];
  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getNewsList();
  }

  getNewsList() {
    this.newsList = [];
    this.rest.getNewsList().subscribe((data: {}) => {
      this.newsList = data;
    });
  }

  check(id) {
    if (!this.deletedNews.includes(id)) {
      this.deletedNews.push(id);
    } else {
      const index = this.deletedNews.indexOf(id, 0);
      this.deletedNews.splice(index, 1);
    }
  }

  delete() {
         this.rest.deleteNews(this.deletedNews)
        .subscribe(res => {
          this.deletedNews = [];
          this.getNewsList();
          }, (err) => {
            console.log(err);
          }
        );
    }

}

