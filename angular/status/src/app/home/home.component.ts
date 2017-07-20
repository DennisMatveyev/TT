import { Component, OnInit } from '@angular/core';
import {HttpService} from "../services/http.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [HttpService],
})
export class HomeComponent implements OnInit {
  userId: number;
  username: string;
  status: string;
  expanded: boolean = false;
  users: Array<{}>;

  usernameFilter: string;
  statusFilter: string;

  constructor(private httpService: HttpService, private router: Router) {}

  ngOnInit() {
    this.usernameFilter = '';
    this.statusFilter = '';

    this.httpService.getUserData().subscribe(
      (receivedData) => {
        this.userId = receivedData['id'];
        this.username = receivedData['username'];
        this.status = receivedData['status_display'];
      }
    );

    this.httpService.getUsers().subscribe(
      (data) => {
        this.users = data;
      }
    );
  }

  onDropdownStatus() {
    this.expanded = !this.expanded;
  }

  setStatus(status: string): void {
    let data = {
      'UniqueID': this.userId,
      'CurrentStatus': status
    };
    this.httpService.postUserStatus(data).subscribe(
      (receivedData) => {
        this.status = receivedData['status'];
        this.expanded = false;
        this.setFilter();
      }
    )
  }

  setFilter() {
    let search = {'search': `${this.usernameFilter},${this.statusFilter}`};

    this.httpService.getUsers(search).subscribe(
      (data) => {
        this.users = data;
      }
    );
  }
}
