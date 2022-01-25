import { Inject, Injectable, InjectionToken } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StorageService } from '../storage/storage.service';

export interface AccessToken {
  accessToken: any,
  tokenType: string,
}

export const JWT_TOKEN_KEY = new InjectionToken<string>('JwtTokenKey');
export const JWT_USER_PROFILE_KEY = new InjectionToken<string>('JwtUserProfileKey');

@Injectable({
  providedIn: 'root'
})
export class JwtTokenService {

  token: any;

  constructor(
    @Inject(JWT_TOKEN_KEY) private jwtTokenKey: string, 
    @Inject(JWT_USER_PROFILE_KEY) private jwtUserProfileKey: string,
    private storageService: StorageService
  ) { }

  isTokenExpired(): boolean {
    let token = this.storageService.getItem(this.jwtTokenKey);
    if (!token) { return false; }
    let jwtHelper = new JwtHelperService();
    return !jwtHelper.isTokenExpired(token);
  }
  
  getTokenWithProfile(): any {
    return this.storageService.getItem(this.jwtTokenKey);
  }
  
  setTokenWithProfile(token: any, profile: any): void {
    this.storageService.setItem(this.jwtTokenKey, token.data);
    this.storageService.setItem(this.jwtUserProfileKey, profile);
  }
  
  removeTokenWithProfile(): void {
    this.storageService.removeItem(this.jwtTokenKey);
    this.storageService.removeItem(this.jwtUserProfileKey);
  }
}
