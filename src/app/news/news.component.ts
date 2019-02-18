import { Component, OnInit } from '@angular/core';
import {RestService} from '../rest.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  news: any;

  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.rest.getNews(this.route.snapshot.params['id']).subscribe((data: {}) => {
      this.news = data;
    });
  }

  delete(id) {
    const deleteNews: number[] = [id];
    this.rest.deleteNews(deleteNews)
      .subscribe(res => {
        this.router.navigate(['/news-list']);
        }, (err) => {
          console.log(err);
        }
      );
  }

}
