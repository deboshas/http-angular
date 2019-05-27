import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { post } from './post';
import { AppError } from './appError';
import { NotFoundError } from './NotFoundError';
import { BadInputError } from './badInputError';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Http';
  posts: post[];
  filterdposts: post[];
  constructor(private httpService: HttpService) {
  }
  search(key: string) {
    this.filterdposts = this.posts;
    this.filterdposts = this.filterdposts.filter(post => post.title.includes(key));
  }

  Edit(post) {

    this.httpService.updatePostdata(post)
      .subscribe(res => {
        console.log(res);
      },
        (error: any) => {
          //handle expectated  error mainly 404 and 400
          throw error;
        })
  }

  createPost() {

    this.httpService.CreatePostdata()
      .subscribe(res => {
        console.log(res.body, res.title, res.id, res.userId);
      },
        (error: any) => {

          throw error;
        })
  }

  ngOnInit() {
    //always call http  within oninit
    this.httpService.getPostData().subscribe(posts => {

      this.filterdposts = this.posts = posts;
    },
      (error: any) => {
        throw error;
      })
  }
}
