import { Component, OnInit, Inject } from "@angular/core";
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef
} from "@angular/material/bottom-sheet";

@Component({
  selector: "app-playlists",
  templateUrl: "./playlists.component.html",
  styleUrls: ["./playlists.component.scss"]
})
export class PlaylistsComponent implements OnInit {
  playlists;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private bottomSheetRef: MatBottomSheetRef<PlaylistsComponent>
  ) {
    this.playlists = data;
  }

  ngOnInit() {}

  closeDialog(list) {
    this.bottomSheetRef.dismiss(list);
  }
}
