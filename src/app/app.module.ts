import { CallbackComponent } from "./callback/callback.component";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { Routes, RouterModule } from "@angular/router";

import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { MatListModule } from "@angular/material/list";
import { MatBadgeModule } from "@angular/material/badge";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { PlayComponent } from "./play/play.component";
import { PlaylistsComponent } from "./playlists/playlists.component";
import { ReactiveFormsModule } from "@angular/forms";

const appRoutes: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "callback",
    component: CallbackComponent
  },
  {
    path: "play",
    component: PlayComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    CallbackComponent,
    LoginComponent,
    PlayComponent,
    PlaylistsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatBottomSheetModule,
    MatListModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [PlaylistsComponent]
})
export class AppModule {}
