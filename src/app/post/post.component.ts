import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/services/post.service';
import AppError from '../common/app-error';
import { BadInput } from '../common/bad-input';
import NotFoundError from '../common/not-found-error';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  posts: any = [];

  constructor(private service: PostService) {}

  ngOnInit(): void {
    this.service.getAll().subscribe((posts) => (this.posts = posts));
  }

  createPost(input: HTMLInputElement) {
    const post: any = { title: input.value };
    input.value = '';

    // Optimistic update UI
    this.posts.splice(0, 0, post);

    this.service.create(post).subscribe(
      (response: any) => {
        post.id = response.id;
      },
      (error: HttpErrorResponse) => {
          // Remove first post updated optimistically
          this.posts.splice(0, 1);

        if (error instanceof BadInput) {
          console.log(error.originalError);
        } else {
          throw Error();
        }
      }
    );
  }

  updatePost(post: HTMLInputElement) {
    this.service.update(post).subscribe((updatedPost: any) => {
      console.log(updatedPost);
    });
  }

  deletePost(post: HTMLInputElement) {
    // Optimistic update deleting post before server call
    const index = this.posts.indexOf(post);
    this.posts.splice(index, 1);

    this.service.deletePost(post.id).subscribe(
      null,
      (error: AppError) => {
        // Re-add the post
        this.posts.splice(index, 0, post);

        if (error instanceof NotFoundError)
          alert('This post has already been deleted');
        else throw new Error();
      }
    );
  }
}
