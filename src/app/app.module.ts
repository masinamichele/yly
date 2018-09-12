import { CallbackComponent } from "./callback/callback.component";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { Routes, RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";

const appRoutes: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "callback",
    component: CallbackComponent
  }
];

@NgModule({
  declarations: [AppComponent, CallbackComponent, LoginComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    MatButtonModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
