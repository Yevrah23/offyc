import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-view-porposal',
  templateUrl: './view-porposal.component.html',
  styleUrls: ['./view-porposal.component.scss']
})
export class ViewPorposalComponent implements OnInit {
  isUser: true;
  state: number;
  stateLabel: string;
  isLinear = false;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ViewPorposalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit() {
    if (this.state === 0) {
      this.stateLabel = 'For Revision';
    } else {
      this.stateLabel = 'Accepted';
    }
  }

  generatePDF(quality = 1) {
    const data = document.getElementById('contentToConvert');
    // $('#contentToConvert').css('overflow', 'visible');
    html2canvas(data, { scale: quality }).then(canvas => {
      // Few necessary setting options
      const contentDataURL = canvas.toDataURL('image/png');
      const imgWidth = 595;
      const pageHeight = 835;

      const ratio = pageHeight / imgWidth;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const newHeight = imgWidth * ratio;
      const heightLeft = imgHeight;
      const pdf = new jspdf('p', 'pt', 'a4');
      const position = 0;

      // document.body.appendChild(canvas);
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, pageHeight);

      // for (let i = 0; i <= data.clientHeight / 980; i++) {
      //   // ! This is all just html2canvas stuff
      //   const srcImg = canvas;
      //   const sX = 0;
      //   const sY = 980 * i; // start 980 pixels down for every new page
      //   const sWidth = 948;
      //   const sHeight = data.clientHeight;
      //   const dX = 0;
      //   const dY = 0;
      //   const dWidth = 948;
      //   const dHeight = data.clientHeight;

      //   // tslint:disable-next-line:prefer-const
      //   let onePageCanvas = document.createElement('canvas');
      //   onePageCanvas.setAttribute('width', '948');
      //   onePageCanvas.setAttribute('height', '980');
      //   const ctx = onePageCanvas.getContext('2d');
      //   // details on this usage of this function:
      //   // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images#Slicing
      //   ctx.drawImage(srcImg, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight);

      //   // document.body.appendChild(onePageCanvas);
      //   const canvasDataURL = onePageCanvas.toDataURL('image/png');

      //   const width = onePageCanvas.width;
      //   const height = onePageCanvas.clientHeight;

      //   // ! If we're on anything other than the first page,
      //   // add another page
      //   if (i > 0) {
      //     pdf.addPage('A4', 'l'); // 791, 612 8.5" x 11" in pts (in*72)
      //     // 842, 595, 8.27 × 11.69 inches A4 in pts (in*72)
      //   }
      //   // ! now we declare that we're working on that page
      //   pdf.setPage(i + 1);
      //   // !now we add content to that page! 20, 40
      //   pdf.addImage(canvasDataURL, 'PNG', 60, 10, (width * .62), (height * .62));
      //   console.log(data.clientHeight, data.clientWidth);
      // }
      // // ! after the for loop is finished running, we save the pdf.
      pdf.save('Proposal-Cover.pdf');
      this.dialog.closeAll();
      console.log(imgHeight, canvas.height, canvas.width, heightLeft);
      // $('#contentToConvert').css('overflow', 'auto');
    });
  }

}
