import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent implements OnInit {
  @Input('likesCount') likesCount: number = 0;
  @Input('isActive') isActive: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    this.isActive = !this.isActive;
    this.likesCount += (this.isActive) ? -1 : 1;
  }
}
