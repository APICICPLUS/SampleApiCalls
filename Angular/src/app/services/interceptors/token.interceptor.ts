import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { JwtTokenService } from "../jwt-token/jwt-token.service";
import { StorageService } from 'src/app/services/storage/storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private jwtAuth: JwtTokenService,
    private storageService: StorageService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    var token = this.jwtAuth.getTokenWithProfile();
    var subscriptionKey = this.storageService.getItem("apim-key");
    var changedReq;

    if (token) {
      changedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          "Ocp-Apim-Subscription-Key": subscriptionKey
        },
      });
    } else {
      changedReq = req.clone({
        setHeaders: {
          "Ocp-Apim-Subscription-Key": subscriptionKey
        },
      });
    }
    return next.handle(changedReq);
  }
}
