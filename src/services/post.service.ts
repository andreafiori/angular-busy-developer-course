import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import AppError from 'src/app/common/app-error';
import { BadInput } from 'src/app/common/bad-input';
import NotFoundError from 'src/app/common/not-found-error';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private url = 'http://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<any> {
    return this.http.get(this.url).pipe(catchError(this.handleError));
  }

  createPost(post: Object): Observable<any> {
    return this.http
      .post(this.url, JSON.stringify(post))
      .pipe(catchError(this.handleError));
  }

  updatePost(post: any): Observable<any> {
    return this.http
      .patch(this.url + '/' + post.id, JSON.stringify(post))
      .pipe(catchError(this.handleError));
  }

  deletePost(id: any): Observable<any> {
    return this.http
      .delete(this.url + '/' + id)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 400) {
      return throwError(new BadInput());
    }

    if (error.status === 404) {
      return throwError(new NotFoundError());
    }

    return throwError(new AppError(error));
  }
}
