import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService implements StorageService {

  constructor() { }

  setItem(key: string, value: any): void {
    value = JSON.stringify(value);
    localStorage.setItem(key, value);
  }

  getItem(key: string): any {
    const value = localStorage.getItem(key);
    try {
      return JSON.parse(value || '{}');
    } catch (e) {
      return null;
    }
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }

}
