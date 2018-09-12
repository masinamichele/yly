import { Component } from "@angular/core";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  clientId = "ada1330ff00d4be89eea2dc8e7315186";
  responseType = "code";
  // redirectUri = "http%3A%2F%2Flocalhost%3A4201%2Fcallback";
  redirectUri = "https%3A%2F%2Fyly.herokuapp.com%2Fcallback";
  scope = "user-read-private%20user-read-email";
  state = "qwerty123";
  authUrl = `https://accounts.spotify.com/authorize/?client_id=${
    this.clientId
  }&response_type=${this.responseType}&redirect_uri=${this.redirectUri}&scope=${
    this.scope
  }&state=${this.state}`;

  login() {
    window.location.href = this.authUrl;
  }
}
