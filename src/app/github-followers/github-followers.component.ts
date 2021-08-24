import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';
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

    // Using combine to get both route params and query string values
    const obs = combineLatest([
      this.route.paramMap,
      this.route.queryParamMap
    ])
    .pipe(
      switchMap(combined => {
        const id = combined[0].get('id');
        const page = combined[1].get('page');

        // You can use parameters to query the followers
        return this.service.getAll();
      })
    )
    .subscribe(followers => (this.followers = followers));

    // this.route.paramMap.subscribe();
    // const id = this.route.snapshot.paramMap.get('id');

    // Get query string parameters
    // this.route.queryParamMap.subscribe();
    // const page = this.route.snapshot.queryParamMap.get('page');

    // Get followers list
    // this.service.getAll()
    //   .subscribe((followers) => (this.followers = followers));
  }

}
