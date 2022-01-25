import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthorizationService } from 'src/app/services/authorization/authorization.service';
import { JwtTokenService } from 'src/app/services/jwt-token/jwt-token.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  user!: User;
  serverError: boolean = false;
  serverMessage: string = '';
  processing: boolean = false;
  hidePassword: boolean = true;

  returnUrl: string | null = '';

  constructor(
    private usersService: AuthorizationService,
    private jwtTokenService: JwtTokenService,
    private router: Router,
    private storageService: StorageService) { }

  ngOnInit() {
    this.user = <User>{ email: '', password: '', userId: '', CompanyUrlSuffix: '', phone: '', userName: '' };
  }

  signIn() {
    this.processing = true;
    this.clearErrors();
    this.storageService.setItem("apim-key", this.user.subscriptionKey)
    this.usersService.signIn(this.user)
      .subscribe({
        next: this.handleSignin.bind(this),
        error: this.setError.bind(this)
      });
  }

  private clearErrors() {
    this.serverError = false;
    this.serverMessage = '';
  }

  setError(res: any) {
    this.serverError = true;
    this.serverMessage = res?.error?.message ?? 'Unknown server error';
    this.processing = false;
  }

  handleSignin(res: any) {
    this.processing = false;
    if (res?.success) {
      this.jwtTokenService.setTokenWithProfile(res, this.user.userName);
      this.router.navigateByUrl('/api-tester');
    }
    else {
      this.serverError = true;
      this.serverMessage = res.message;
    }
  }

  cancel() {
  }

}
