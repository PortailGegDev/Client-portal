import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-documents-contract-document',
  imports: [CommonModule,CardModule,ButtonModule,PanelModule],
  templateUrl: './contract-document.component.html',
  styleUrl: './contract-document.component.scss'
})
export class AppDocumentsContractDocumentComponent {


  documents = [
    { title: 'Justificatif de domicile', date: '1er Janv. 2023' },
    { title: 'Grille tarifaire Tarif Base', date: '1er Janv. 2023' },
    { title: 'Certificat de garantie d`origine', date: '1er Janv. 2023' },
    { title: 'CGV', date: '2023 Tarif Base' }

  ];
}
