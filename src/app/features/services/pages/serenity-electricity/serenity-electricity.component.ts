import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppRequestsHighlightComponent } from '../../../requests/components/highlight/highlight.component';
import { PanelModule } from 'primeng/panel';
import { SplitterModule } from 'primeng/splitter';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { Constants } from '../../../../shared/utils/constants';
import { formatDateFr } from '../../../../shared/utils/date-utilities';
import { OptionVerte } from '../../../../shared/models/option-verte.model';
import { VariousService } from '../../../../shared/services/various.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-services-serenity-electricity',
  imports: [CommonModule,FormsModule, AppRequestsHighlightComponent,PanelModule,SplitterModule,TagModule,ButtonModule,CardModule],
  standalone: true,
  templateUrl: './serenity-electricity.component.html',
  styleUrl: './serenity-electricity.component.scss'
})
export class AppServicesSerenityElectricityComponent {
title: string = '';
date: string = '';
optionVertes: OptionVerte[]=[];

  constructor(private router: Router,private variousService: VariousService) { }

  ngOnInit() {
    this.loadOptions();
  }
  loadOptions() {
      this.variousService.getOptionVerteData().subscribe({
        next: (data: OptionVerte[]) => {
          this.optionVertes = data;
        },
        error(error) {
          console.error('Erreur lors du chargement des données :', error);
        },
      });
    }
    
   documents = [
    { title: 'CGV Option Verte', type: Constants.ContractSupportingDoc.CGV, date: formatDateFr(new Date()) }
  ];
  RetourEnBack() {
    this.router.navigate(['services']);
  }

  boxData: any[] = [
    {
      status: 'souscrit',
      price: '2,99€/mois',
      service: 'assistance dépannage',
      title: 'Sérénité Electricité',
      icon: '/images/Icons (1).png',
      backgroundImage: '/images/service_contrat.jpg',
      link: '/services/serenity-electricity' 

    },
  ]
  
}
