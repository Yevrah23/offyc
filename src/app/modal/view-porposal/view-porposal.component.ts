import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-view-porposal',
  templateUrl: './view-porposal.component.html',
  styleUrls: ['./view-porposal.component.scss']
})
export class ViewPorposalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ViewPorposalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit() {
  }

}
