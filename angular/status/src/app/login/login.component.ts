import { Component, OnInit } from '@angular/core';
import {HttpService} from "../services/http.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [HttpService]
})
export class LoginComponent implements OnInit {
  username: string;

  constructor(private httpService: HttpService, private router: Router) {}

  ngOnInit() {}

  onLoginSubmit(): void {
    let postData = {
      'username': this.username
    };

    this.httpService.postLoginData(postData).subscribe(
      (receivedData) => {
        localStorage.setItem('token', receivedData['token']);
        this.router.navigate(['/home']);
      }
    );
  }

}
