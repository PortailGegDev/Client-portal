import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  imports: [CommonModule, FormsModule, AppRequestsHighlightComponent, PanelModule, SplitterModule, TagModule, ButtonModule, CardModule],
  standalone: true,
  templateUrl: './serenity-electricity.component.html',
  styleUrl: './serenity-electricity.component.scss'
})
export class AppServicesSerenityElectricityComponent implements OnInit {
  @Output() boxesChange = new EventEmitter<any[]>();
  title: string = '';
  date: string = '';
  box: any;
  assistanceDepannage: OptionVerte[] = [];

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
      const fromConstants = (Constants.BoxData || []).find((b: any) => b.id === 'ELECTRICITE' || b.link === '/services/serenity-electricity' || b.title?.includes('Sérénité Electrcité'));
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

    console.log('ELECTRICITE: effective box:', this.box);
  }

  loadOptions() {
    this.variousService.getAssistanceDepannageData().subscribe({
      next: (data: OptionVerte[]) => {
        this.assistanceDepannage = data; // <- assignation indispensable
        console.log('Assistance Dépannage:', this.assistanceDepannage);
      },
      error(error) {
        console.error('Erreur lors du chargement des données :', error);
      },
    });
  }

  documents = [
    { title: 'Conditions générales (CG)', type: Constants.ContractSupportingDoc.CONDITION_GENERALE , link: '/CG-assistance-depannage.pdf' },
    { title: 'Document d’information sur le produit d’assurance (DIPA)', type: Constants.ContractSupportingDoc.DOCUMENT_INFORMATION ,link:'/DIPA-Contrats.pdf'},
    { title: 'Fiche d’Information et de Conseil (FIC)', type: Constants.ContractSupportingDoc.FICHE_INFORMATION ,  link:'/Fiche-d-Information-et-de-Conseil-FIC.pdf'}
  ];

  RetourEnBack() {
    this.router.navigate(['services']);
  }

  goToForm(action: 'subscribe' | 'recission', boxId?: string) {
    const id = boxId ?? this.box?.id;
    this.router.navigate(['services/recission-form'], { queryParams: { boxId: id, action } });
  }
}
