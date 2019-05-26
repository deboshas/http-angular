import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { post } from './post';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  posts: post[];
  url = "https://jsonplaceholder12.typicode.com/posts";
  constructor(private httpClient: HttpClient) { }

  getPostData(): Observable<post[]> {

    return this.httpClient.get<post[]>(this.url);

  }
  updatePostdata(post: post) {

    return this.httpClient.put(this.url + "/" + post.id, JSON.stringify(post));
  }

  CreatePostdata() {
    let post = {
      userId: "50",
      title: "Sample post",
      body: "Sample post data"

    };
    return this.httpClient.post<post>(this.url, JSON.stringify(post));
  }
}
