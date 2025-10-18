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
  box: any;
  optionVertes: OptionVerte[] = [];

  constructor(private router: Router, private variousService: VariousService) { }

  ngOnInit() {
    this.loadOptions();
    // this.boxesChange.emit(this.boxData); // émet les boxes au parent
  const nav = this.router.getCurrentNavigation();
    if (nav?.extras?.state?.['box']) {
      this.box = nav.extras.state['box'];
    } else if (history.state?.box) {
      // 2) fallback si on arrive via refresh ou back
      this.box = history.state.box;
    } else {
      // 3) Final fallback : prendre la box depuis Constants.BoxData (met à jour par le parent)
      const fromConstants = (Constants.BoxData || []).find((b: any) => b.id === 'GREEN_OPTION' || b.link === '/services/green-option' || b.title?.includes('Option Verte'));
      if (fromConstants) {
        this.box = { ...fromConstants };
      } else {
        // valeur minimale par défaut pour ne pas casser le template
        this.box = {
        };
      }
    }

    // Si status absent, essayer à nouveau depuis Constants (au cas où parent a mis à jour Constants.BoxData)
    if (this.box && (this.box.status === undefined || this.box.status === null)) {
      const also = (Constants.BoxData || []).find((b: any) =>
        (b.id && this.box.id && b.id === this.box.id) ||
        (b.link && this.box.link && b.link === this.box.link)
      );
      if (also?.status) this.box.status = also.status;
      else this.box.status = '';
    }

    console.log('GreenOption: effective box:', this.box);
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

goToForm(action: 'subscribe' | 'recission', boxId?: string) {
  const id = boxId ?? this.box?.id;
  this.router.navigate(['services/recission-form'], { queryParams: { boxId: id, action } });
}
}
