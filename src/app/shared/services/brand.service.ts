import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  private selectedBrand: string = 'geg'; // Par défaut

  setBrand(brand: string): void {
    this.selectedBrand = brand;
    localStorage.setItem('selectedBrand', brand); // Stocke la marque
  }

  getBrand(): string {
    return localStorage.getItem('selectedBrand') || this.selectedBrand;
  }

  getLogo(): string {
    const theme = this.getBrand();
    return theme === 'geg'
      ? '/images/geg-logo.png'
      : '/images/yeli-logo.png';
  }
}
