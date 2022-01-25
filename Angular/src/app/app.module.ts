import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from "@angular/material/dialog";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './components/signin/signin.component';
import { ApiTesterComponent } from './components/api-tester/api-tester.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PdfViewerDialogComponent } from './components/pdf-viewer-dialog/pdf-viewer-dialog.component';
import { TokenInterceptor } from './services/interceptors/token.interceptor';
import { JWT_TOKEN_KEY, JWT_USER_PROFILE_KEY } from './services/jwt-token/jwt-token.service';
import { SessionStorageService } from './services/storage/session-storage.service';
import { LocalStorageService } from './services/storage/local-storage.service';
import { JwtTokenService } from './services/jwt-token/jwt-token.service';
import { StorageService } from './services/storage/storage.service';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    ApiTesterComponent,
    PdfViewerDialogComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    PdfViewerModule,
    FlexLayoutModule
  ],
  providers: [
    SessionStorageService,
    LocalStorageService,
    JwtTokenService,
    { provide: StorageService, useClass: SessionStorageService },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true, },
    { provide: JWT_TOKEN_KEY, useValue: 'token' },
    { provide: JWT_USER_PROFILE_KEY, useValue: 'user-profile' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
