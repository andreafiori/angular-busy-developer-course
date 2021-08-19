import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/services/post.service';
import AppError from '../common/app-error';
import { BadInput } from '../common/bad-input';
import NotFoundError from '../common/not-found-error';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  posts: any = [];

  constructor(private service: PostService) {
  }

  ngOnInit(): void {
    this.service.getPosts()
      .subscribe(
        response => {
          this.posts = response;
        });
  }

  createPost(input: HTMLInputElement) {
    const post: any = { title: input.value };
    input.value = '';

    this.service.createPost(post)
      .subscribe(
        (response: any)  => {
          post.id = response.id;

          this.posts.splice(0, 0, post);
        },
        (error: HttpErrorResponse) => {
          if (error instanceof BadInput) {
            console.log(error.originalError);
          } else {
            throw Error();
          }
        });
  }

  updatePost(post: HTMLInputElement) {
    this.service.updatePost({ isRead: true })
      .subscribe(
        response => {
          console.log(response);
        });
  }

  deletePost(post: HTMLInputElement) {
    this.service.deletePost(post.id)
    .subscribe(
      response => {
        console.log(response);

        const index = this.posts.indexOf(post);

        this.posts.splice(index, 1);
      },
      (error: AppError) => {
        if (error instanceof NotFoundError)
           alert('This post has already been deleted');
        else
          throw new Error();
    });
  }
}
