import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { PayStatementSampleListItem } from 'src/app/models/pay-statement-sample-list-item';
import { PayStatementService } from 'src/app/services/pay-statement/pay-statement-service.service';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { MatDialogConfig } from '@angular/material/dialog';
import { PdfViewerDialogComponent } from '../pdf-viewer-dialog/pdf-viewer-dialog.component';

@Component({
  selector: 'app-api-tester',
  templateUrl: './api-tester.component.html',
  styleUrls: ['./api-tester.component.scss']
})
export class ApiTesterComponent implements OnInit {

  samplePayStatements: PayStatementSampleListItem[] = [];
  loading: boolean = false;
  dataSource = new MatTableDataSource<PayStatementSampleListItem>();
  displayedColumns: string[] = ['name', 'description', 'view'];
  pdfUrl: string = '';
  psPdf: any;
  serverError: boolean = false;
  serverMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private payStatementService: PayStatementService,
    private dialogService: DialogService) {

  }

  ngOnInit() {
    this.payStatementService.getSampleFormats().subscribe((data: any[]) => {
      console.log(data);
      this.samplePayStatements = data;
    });
  }

  viewPdf(sampleName: string) {
    this.payStatementService.getSamplePdf(sampleName)
      .subscribe((res: any) => {
        this.showPdf(res);
      }, (error: any) => {
      }, () => {
        this.loading = false;
      });
  }

  private showPdf(url: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '900px';
    dialogConfig.height = '100%';
    dialogConfig.data = url;
    this.dialogService.open(PdfViewerDialogComponent, dialogConfig)
      .subscribe(result => {
        if (!result) { return };
      })
  }
}
