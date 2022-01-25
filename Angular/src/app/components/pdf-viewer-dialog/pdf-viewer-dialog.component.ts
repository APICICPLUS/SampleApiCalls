import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-pdf-viewer-dialog',
  templateUrl: './pdf-viewer-dialog.component.html',
  styleUrls: ['./pdf-viewer-dialog.component.scss']
})
export class PdfViewerDialogComponent implements OnInit {
  @ViewChild(PdfViewerComponent, { static: false })
  private pdfComponent!: PdfViewerComponent;
  
  url: string;

  constructor(public dialogRef: MatDialogRef<PdfViewerDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.url = this.data;
  } 

  ngOnInit(): void {
  }

}
