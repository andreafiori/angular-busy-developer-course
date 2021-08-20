import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GithubFollowersService } from 'src/services/github-followers.service';

@Component({
  selector: 'github-followers',
  templateUrl: './github-followers.component.html',
  styleUrls: ['./github-followers.component.css']
})
export class GithubFollowersComponent implements OnInit {
  followers: any = [];

  constructor(private route: ActivatedRoute, private service: GithubFollowersService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe();
    const id = this.route.snapshot.paramMap.get('id');

    // Get query string parameters
    this.route.queryParamMap.subscribe();
    const page = this.route.snapshot.queryParamMap.get('page');

    // Get followers list
    this.service.getAll()
      .subscribe((followers) => (this.followers = followers));
  }

}
