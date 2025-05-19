import { Component } from '@angular/core';
import { BrandService } from '../../services/brand.service';

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

  goToLink(platform: string): void {
    const links: { [key: string]: string } = {
      instagram: 'https://www.instagram.com/gazelectricitegrenoble',
      youtube: 'https://www.youtube.com/user/GEGvideos',
      linkedin: 'https://www.linkedin.com/company/gaz-electricité-de-grenoble-se/',
      facebook: 'https://www.facebook.com/GazElectriciteGrenoble/',
    };
  
    const url = links[platform];
    if (url) {
      window.open(url, '_blank');
    }
  }
  
}
