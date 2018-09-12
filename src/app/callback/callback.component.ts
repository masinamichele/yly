import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-callback",
  templateUrl: "./callback.component.html",
  styleUrls: ["./callback.component.css"]
})
export class CallbackComponent implements OnInit {
  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  // https://developer.spotify.com/documentation/general/guides/authorization-guide/

  ngOnInit() {
    if (this.route.snapshot.queryParamMap.get("state") === "qwerty123") {
      console.log(this.route.snapshot.queryParamMap.get("code"));

      // const corsUrl = "https://cors-anywhere.herokuapp.com/";
      const url = "https://accounts.spotify.com/api/token";

      const body = new URLSearchParams();
      body.set("grant_type", "authorization_code");
      body.set("code", this.route.snapshot.queryParamMap.get("code"));
      body.set("redirect_uri", "http://localhost:4201/callback");
      body.set("client_id", "ada1330ff00d4be89eea2dc8e7315186");
      body.set("client_secret", "7ce2de80dd4e40e3af3ca79d85d53b83");

      // TODO cors? https://www.html5rocks.com/en/tutorials/cors/

      // Su Insomnia funziona tutto, quindi una volta sistemata questa cosa del CORS prendere da lì i passi successivi

      this.http
        .post(url, body)
        .pipe()
        .subscribe(console.log);
    }
  }
}
