import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { SubmitProposalComponent } from '../submit-proposal/submit-proposal.component';
import { ReportTemplateComponent } from '../report-template/report-template.component';
import { empty } from 'rxjs';

@Component({
  selector: 'app-generate-report',
  templateUrl: './generate-report.component.html',
  styleUrls: ['./generate-report.component.scss']
})
export class GenerateReportComponent implements OnInit {
  // date picker
  startDate = new Date(2019, 0, 1);

  // radio selected
  selectedReport = '';



  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<SubmitProposalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


    showTemplate(): void {
      if (this.selectedReport !== '') {
        const dialogRef = this.dialog.open(ReportTemplateComponent, {
          width: '1600px',
          panelClass: 'custom-dialog-template',
          data: {
            radio: this.selectedReport
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          console.log(result);
        });
      } else {
        console.log('You  must select type of report');
      }
    }
  ngOnInit() {
  }

}
