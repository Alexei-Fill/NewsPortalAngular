import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { NewsComponent } from './news/news.component';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsEditComponent } from './news-edit/news-edit.component';
import { NewsAddComponent } from './news-add/news-add.component';

const appRoutes: Routes = [
  {
    path: 'news-list',
    component: NewsListComponent,
    data: { title: 'News List' }
  },
  {
    path: 'newsS/:id',
    component: NewsComponent,
    data: { title: 'News Details' }
  },
  {
    path: 'news-add',
    component: NewsAddComponent,
    data: { title: 'News Add' }
  },
  {
    path: 'news-edit/:id',
    component: NewsEditComponent,
    data: { title: 'News Edit' }
  },
  { path: '',
    redirectTo: '/news-list',
    pathMatch: 'full'
  }
];
@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    NewsListComponent,
    NewsEditComponent,
    NewsAddComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    FormsModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
