import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../services/repository.service';
import { ToastrService } from 'ngx-toastr';

declare var $: any;

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.css']
})
export class RepositoryComponent implements OnInit {

  /*
    -title for showing title to the App.

    -username is required for fetching all repos.

    -repoNameList is required to subscribe to the repos result API.

    -searchKey is related to what keyword user is typing.

    -oldUsername is required to validate with username, so that will not
    make API call for same user multiple times.

    -reposNotFound is required to Empty Repositories Message in case when API call is
    successful but there is no repo available for user.
  */
  title = 'Repository App';
  username: string;
  repoNameList: string[] = [];
  searchKey: string;
  oldUsername: string;
  reposNotFound: boolean;

  constructor(private repositoryService: RepositoryService, private toastr: ToastrService) { }

  ngOnInit() {
    this.searchKey = '';
    this.reposNotFound = false;
  }

  // fetch all repos for user input
  getRepoNameList() {
    if (!this.oldUsername || this.oldUsername !== this.username) {
      $.blockUI();
      this.oldUsername = this.username;
      this.repositoryService.getRepos(this.username).subscribe(result => {
        this.repoNameList = result;
        this.reposNotFound = this.repoNameList.length > 0 ? false : true;
        this.toastr.success('Repositories fetched successfully.');
        $.unblockUI();
      }, err => {
        this.toastr.error(`Repository ${err.error.message} with ${this.username}`);
        $.unblockUI();
      });
    }
  }

  /* on clicking clear button,
    If flag is 1, then only will clear username and if repoNameList has data then will clear searchKey
    Will always clear filteredRepos and repoNameList and make reposNOtFound as false in any case.
  */
  clearUsername(flag?: number) {
    if (flag === 1) {
      this.username = '';
    }
    if (this.repoNameList) {
      this.searchKey = '';
    }
    this.repoNameList.length = 0;
    this.reposNotFound = false;
  }

  /* on Changing username, validating old and current username base on it clearing repoNamList,
  filteredRepos and searchKey
  */
  onUsernameChange() {
    if (this.oldUsername && this.oldUsername !== this.username) {
      this.clearUsername();
    }
  }

  // render only new items to list using *ngFor
  trackByFn(index, item) {
    return index;
  }

}
