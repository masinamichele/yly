import { Inject } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef
} from "@angular/material/bottom-sheet";

@Component({
  selector: "app-queue",
  templateUrl: "./queue.component.html",
  styleUrls: ["./queue.component.scss"]
})
export class QueueComponent implements OnInit {
  queue;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private bottomSheetRef: MatBottomSheetRef<QueueComponent>
  ) {
    this.queue = data;
  }

  ngOnInit() {}

  closeDialog(q) {
    this.bottomSheetRef.dismiss(q);
  }
}
