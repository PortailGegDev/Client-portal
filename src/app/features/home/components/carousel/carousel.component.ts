import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { VariousService } from '../../../../shared/services/various.service';
import { Carousel } from '../../../../shared/models/carousel.model';
import { CardModule } from 'primeng/card';
import { Constants } from '../../../../shared/utils/constants';

@Component({
  selector: 'app-home-carousel',
  imports: [CardModule, CarouselModule, ButtonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class AppHomeCarouselComponent implements OnChanges {
  @Input() isClientPrecaireAide: boolean = false;

  carouselData: Carousel[] = [];

  constructor(private variousService: VariousService) { }

   ngOnChanges(changes: SimpleChanges) {
    if (changes['isClientPrecaireAide']) {
      this.initCarouselData();
    }
  }

  initCarouselData() {
    this.variousService.getCarouselData().subscribe({
      next: (data: Carousel[]) => {

        // TODO : A supprimer lorsqu'on aura la règle de gestion pour afficher "Relevez vos index"
        this.carouselData = data.filter(item => item.code !== Constants.Carousel_Item_Code.RELEVEZ_INDEX);

        if (!this.isClientPrecaireAide) {
          const carouselDataChequeEnergie = this.carouselData.find(item => item.code === Constants.Carousel_Item_Code.CHEQUE_ENERGIE);

          const index = carouselDataChequeEnergie ? this.carouselData.indexOf(carouselDataChequeEnergie) : -1;

          if (index > -1) {
            this.carouselData.splice(index, 1);
          }
        }
      },
      error: (error) => {
        console.error('Erreur lors du chargement des données de carousel :', error);
      },
    });
  }

  goToLink(carouselData: Carousel) {
    if (carouselData.title === "Un projet d'économies d'énergie ?") {
      window.open('https://www.geg.fr/prime-cee/');
    }
    if (carouselData.title === "Chèque énergie"){
      window.open('https://www.geg.fr/nos-offres/particuliers/cheque-energie/');
    }
  }
}
