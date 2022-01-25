import { Inject, Injectable, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PayStatementSampleListItem } from '../../models/pay-statement-sample-list-item';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PayStatementService {

  private apiAdminPrefix: string = '/api/v1/paystatement/admin/';
  protected serviceAdminUrl: string;

  constructor(
    private httpClient: HttpClient) {
    this.serviceAdminUrl = environment.apiServiceSettings.payStatementServiceUrl + this.apiAdminPrefix;
  }

  getSampleFormats(): Observable<PayStatementSampleListItem[]> {
    return this.httpClient.get(this.serviceAdminUrl + 'samples')
      .pipe(
        map((res: any) => {
          return res.data;
        }),
        catchError<any, Observable<never>>((e) => {
          return throwError(e);
        })
      );
  }

  getSamplePdf(sampleName: string): Observable<any> {
    let params = new HttpParams()
      .set('samplename', sampleName);
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.httpClient.get(this.serviceAdminUrl + 'samples/pdf', { params: params, headers: headers, responseType: 'blob' })
      .pipe(
        map((res: any) => {
          return res;
        }),
        map(blob => {
          const urlCreator = window.URL;
          return urlCreator.createObjectURL(blob);
        }),
        catchError<any, Observable<never>>((e) => { return throwError(e); })
      );
  }

}
