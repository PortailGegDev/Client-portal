import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setItem(storageKey: string, data: any): void {
    localStorage.setItem(storageKey, JSON.stringify(data));
  }

  getItem(storageKey: string): any {
    const storedData = localStorage.getItem(storageKey);
    return storedData ? JSON.parse(storedData) : null;
  }

  clearItem(storageKey: string): void {
    localStorage.removeItem(storageKey);
  }

  clear(): void {
    localStorage.clear()
  }
}
