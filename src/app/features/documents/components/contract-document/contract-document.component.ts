import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppDocumentsJustifBoxComponent } from '../justif-box/justif-box.component';

@Component({
  selector: 'app-documents-contract-document',
  imports: [CommonModule, AppDocumentsJustifBoxComponent],
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
