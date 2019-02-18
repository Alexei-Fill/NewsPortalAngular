import {Component, Input, OnInit} from '@angular/core';
import {RestService} from '../rest.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() userData = {name: '', password: ''};
  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) { }


  ngOnInit() {
  }

  login() {
    this.rest.login(this.userData).subscribe((result) => {
      sessionStorage.setItem('currentUser', this.userData.name);
      this.router.navigate(['/news-list']);
      window.location.reload();
    }, (err) => {
      console.log(err);
    });
  }

}
