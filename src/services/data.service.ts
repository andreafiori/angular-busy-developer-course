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
export class DataService {
  private url: string = '';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.url).pipe(catchError(this.handleError));
  }

  create(resource: Object): Observable<any> {
    return this.http
      .post(this.url, JSON.stringify(resource))
      .pipe(catchError(this.handleError));
  }

  update(resource: any): Observable<any> {
    return this.http
      .patch(this.url + '/' + resource.id, JSON.stringify(resource))
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
