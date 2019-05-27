import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { post } from './post';
import { AppError } from './appError';
import { NotFoundError } from './NotFoundError';
import { BadInputError } from './badInputError';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  posts: post[];
  url = "https://jsonplaceholder.typicode.com/posts/get";
  constructor(private httpClient: HttpClient) { }

  getPostData(): Observable<post[]> {

    return this.httpClient.get<post[]>(this.url)
      .pipe(catchError(
        (err: Response) => {
          return this.handleError(err);
        }

      ))

  }
  updatePostdata(post: post) {

    return this.httpClient.put(this.url + "/" + post.id, JSON.stringify(post))
      .pipe(catchError((err: Response) => {
        return this.handleError(err);
      }));
  }

  CreatePostdata() {
    let post = {
      userId: "50",
      title: "Sample post",
      body: "Sample post data"

    };
    return this.httpClient.post<post>(this.url, JSON.stringify(post))
      .pipe(catchError(
        (err: Response) => {
          return this.handleError(err);
        }

      ))
  }

  private handleError(error: Response) {

    if (error.status === 404) {

      return throwError(new NotFoundError(error));
    }
    else if (error.status === 400) {

      return throwError(new BadInputError(error));
    }
    else {
      return throwError(new AppError(error));
    }

  }

}
