import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map, catchError, tap} from 'rxjs/operators';

const endpoint = 'http://localhost:8786/rest/news';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    const body = res;
    return body || { };
  }


  getNewsList(): Observable<any> {
    return this.http.get(endpoint).pipe(
      map(this.extractData));
  }

  getNews(id): Observable<any> {
    return this.http.get(endpoint + '/' + id).pipe(
      map(this.extractData));
  }

  addNews(news): Observable<any> {
    console.log(news);
    return this.http.post<any>(endpoint, JSON.stringify(news), httpOptions).pipe(
      tap((product) => console.log(`added news id=${news.id}`)),
      catchError(this.handleError<any>('addNews'))
    );
  }

  updateProduct( news): Observable<any> {
    return this.http.put(endpoint , JSON.stringify(news), httpOptions).pipe(
      tap(_ => console.log(`updated news id=${news.id}`)),
      catchError(this.handleError<any>('updateNews'))
    );
  }

  deleteNews(deletedNews): Observable<any> {
    return this.http.request('delete' , endpoint ,   {
      body: deletedNews,
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    })
      .pipe(
      tap(_ => console.log(`deleted news id=${deletedNews.toString()}`)),
      catchError(this.handleError<any>('deleteNews'))
    );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
