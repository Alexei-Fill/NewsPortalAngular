import { Component, OnInit, Input } from '@angular/core';
import {RestService} from '../rest.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-news-add',
  templateUrl: './news-add.component.html',
  styleUrls: ['./news-add.component.css']
})
export class NewsAddComponent implements OnInit {
  @Input() newsData = {title: '', brief: '', content: '', date: ''};
  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

  addNews() {
    this.rest.addNews(this.newsData).subscribe((result) => {
      this.router.navigate(['/news-list']);
    }, (err) => {
      console.log(err);
    });
  }

}
