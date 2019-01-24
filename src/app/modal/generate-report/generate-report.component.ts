import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { SubmitProposalComponent } from '../submit-proposal/submit-proposal.component';
import { ReportTemplateComponent } from '../report-template/report-template.component';

@Component({
  selector: 'app-generate-report',
  templateUrl: './generate-report.component.html',
  styleUrls: ['./generate-report.component.scss']
})
export class GenerateReportComponent implements OnInit {
  // date picker
  startDate = new Date(2019, 0, 1);



  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<SubmitProposalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


    showTemplate(): void {
      const dialogRef = this.dialog.open(ReportTemplateComponent, {
        width: '1000px',
        panelClass: 'custom-dialog-template'
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log(result);
      });
    }
  ngOnInit() {
  }

}
