import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class StorageService {
  
  abstract setItem(key: string, value: any): void;
  abstract getItem(key: string): any;
  abstract removeItem(key: string): any;
  abstract clear(): void;
}
