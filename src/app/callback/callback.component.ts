import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-callback",
  templateUrl: "./callback.component.html",
  styleUrls: ["./callback.component.css"]
})
export class CallbackComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const fragment = this.route.snapshot.fragment;
    const token = fragment.match(/access_token=(.+?)&/)[1];
    localStorage.setItem("token", token);
    this.router.navigate([`/play`]);
  }
}
