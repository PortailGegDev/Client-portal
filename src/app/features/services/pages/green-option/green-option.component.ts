import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppRequestsHighlightComponent } from '../../../requests/components/highlight/highlight.component';
import { OptionVerte } from '../../../../shared/models/option-verte.model';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Constants } from '../../../../shared/utils/constants';
import { formatDateFr } from '../../../../shared/utils/date-utilities';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { VariousService } from '../../../../shared/services/various.service';

@Component({
  selector: 'app-services-green-option',
  imports: [FormsModule, CommonModule, AppRequestsHighlightComponent, CardModule, ButtonModule, PanelModule],
  templateUrl: './green-option.component.html',
  styleUrl: './green-option.component.scss'
})
export class AppServicesGreenOptionComponent {
  @Output() boxesChange = new EventEmitter<any[]>();
  title: string = '';
  date: string = '';
  optionVertes: OptionVerte[] = [];

  constructor(private router: Router, private variousService: VariousService) { }

  ngOnInit() {
    this.loadOptions();
    this.boxesChange.emit(this.boxData); // émet les boxes au parent

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

  RetourEnBack() {
    this.router.navigate(['services']);
  }

  documents = [
    { title: 'CGV Option Verte', type: Constants.ContractSupportingDoc.CGV, date: formatDateFr(new Date()) }
  ];

  boxData: any[] = [
    {
      price: '1€/mois (3 et 6 KVA)  <br>  2€/mois (à partir de 9 KVA)',
      service: 'assistance dépannage',
      title: 'Option Verte',
      icon: '/images/Icons (1).png',
      backgroundImage: '/images/service4.jpg',
      link: '/services/green-option'
    },
  ]


}
