import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  clientId = "ada1330ff00d4be89eea2dc8e7315186";
  responseType = "token";
  redirectUri = window.location.origin + '/callback';
  scope = [
    "user-read-private",
    "user-read-email",
    "user-modify-playback-state",
    "user-read-playback-state",
    "user-library-read",
    "user-library-modify",
    "playlist-read-private"
  ];
  state = "qwerty123";
  authUrl = `https://accounts.spotify.com/authorize/?client_id=${
    this.clientId
  }&response_type=${this.responseType}&redirect_uri=${
    encodeURIComponent(this.redirectUri)
  }&scope=${this.scope.join("%20")}&state=${this.state}`;

  ngOnInit() {
    localStorage.removeItem("token");
  }

  login() {
    window.location.href = this.authUrl;
  }
}
