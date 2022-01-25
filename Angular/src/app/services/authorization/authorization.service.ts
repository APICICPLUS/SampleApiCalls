import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private apiPrefix: string = '/api/v1/authorize/token'

  constructor(private httpClient: HttpClient) {
  }

  signIn(signInUser: User): Observable<any> {
    return this.httpClient.post(environment.apiServiceSettings.authorizationServiceUrl + this.apiPrefix, signInUser);
  }

}
