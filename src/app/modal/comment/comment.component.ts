import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserServices } from 'src/app/services/user_services';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  proposal_id: any;
  comment: string;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<CommentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private user: UserServices
  ) { }

  ngOnInit() {
    this.proposal_id = this.data.data;
  }

  send_comment() {
    console.log(this.proposal_id);
    console.log(this.comment);

    this.user.revise_proposal(this.proposal_id, this.comment).subscribe(
      (response) => {
        console.log(response);
      }
    );
  }

}
