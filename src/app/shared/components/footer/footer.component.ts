import { Component } from '@angular/core';
import { BrandService } from '../../../core/service/brand.service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  logo: string = ''; // Contiendra le chemin du logo
  theme: string = '';

  constructor(private brandService: BrandService){}
  
  ngOnInit() {
    this.logo = this.brandService.getLogo();
    this.theme = this.brandService.getBrand();
  }
}
