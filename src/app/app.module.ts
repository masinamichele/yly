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
import { MatDialogModule } from "@angular/material/dialog";
import { MatSliderModule } from "@angular/material/slider";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { PlayComponent } from "./play/play.component";
import { PlaylistsComponent } from "./playlists/playlists.component";
import { ReactiveFormsModule } from "@angular/forms";
import { QueueComponent } from "./queue/queue.component";
import { PremiumDialogComponent } from "./premium-dialog/premium-dialog.component";

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
    PlaylistsComponent,
    QueueComponent,
    PremiumDialogComponent
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
    MatMenuModule,
    MatDialogModule,
    MatSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [PlaylistsComponent, QueueComponent, PremiumDialogComponent]
})
export class AppModule {}
