import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService implements StorageService {

  constructor() { }

  setItem(key: string, value: any): void {
    value = JSON.stringify(value);
    sessionStorage.setItem(key, value);
  }

  getItem(key: string): any {
    const value = sessionStorage.getItem(key);
    try {
      return JSON.parse(value || '{}');
    } catch (e) {
      return null;
    }
  }

  removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  clear(): void {
    sessionStorage.clear();
  }

}
