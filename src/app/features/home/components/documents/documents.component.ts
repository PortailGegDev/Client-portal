import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Facture } from '../../../../shared/models/facture-model';
import { PanelModule } from 'primeng/panel';
import { Router } from '@angular/router';
import { TimeSpanToDatePipe } from '../../../../shared/pipe/time-span-to-date.pipe';
import { ButtonModule } from 'primeng/button';
import jsPDF from 'jspdf';
import { User } from '../../../../shared/models/user.model';
import { convertSAPDate } from '../../../../shared/utils/date-utilities';

@Component({
  selector: 'app-home-documents',
  imports: [CommonModule, PanelModule, TimeSpanToDatePipe, ButtonModule],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss'
})
export class AppHomeDocumentsComponent {
  @Input() lastInvoice: Facture | null = null;
  @Input() selectedContract: any | null = null;
  @Input() currentUser: User | undefined = undefined;

  constructor(private router: Router) { }

  payFacture(facture: Facture): void {
    if (facture.StatusInvoicingDocument === "Non Soldée") {
      console.log("Paiement de la facture en cours...");
    }
  }

  downloadPDF(facture: Facture): void {
    if (facture.StatusInvoicingDocument === "Totalement Soldée") {
      console.log("Téléchargement du PDF de la facture...");
    }
  }

  downloadJustifPDF() {
    const pdf = new jsPDF();

    // Ajouter un logo centré (remplace 'logo.png' par ton chemin d'image)
    const img = new Image();
    img.src = '/images/geg-logo.png'; // Assurez-vous que le chemin est correct

    img.onload = () => {
      pdf.addImage(img, 'PNG', 80, 10, 14, 14); // Centré en haut (X = 80, Y = 10, largeur = 50, hauteur = 20)

      // Numéro de contrat et énergie concernée (en haut à gauche)
      pdf.setFontSize(8);

      pdf.setDrawColor(168, 191, 31); // Définir la couleur du contour
      pdf.rect(20, 30, 70, 50); // Position (x, y), largeur, hauteur

      pdf.setTextColor(168, 191, 31);
      pdf.text(`Numéro de contrat :`, 25, 40);
      pdf.setTextColor(0, 0, 0);
      pdf.text(`${this.selectedContract.ContractISU}`, 25, 45);

      pdf.setTextColor(168, 191, 31);
      pdf.text(`Énergie concernée :`, 25, 55);
      pdf.setTextColor(0, 0, 0);
      pdf.text(`${this.selectedContract?.BusinessSectorText}`, 25, 60);

      pdf.setTextColor(168, 191, 31);
      pdf.text(`Lieu de consommation :`, 25, 70);
      pdf.setTextColor(0, 0, 0);
      pdf.text(`${this.selectedContract?.AddressCompteur}`, 25, 75);

      // Nom et adresse (en haut à droite)
      pdf.setFontSize(10);
      pdf.text(`${this.currentUser?.firstname} ${this.currentUser?.lastname}`, 120, 40);
      pdf.text(`${this.selectedContract?.AddressCompteur}`, 120, 45);

      // Titre centré et coloré
      pdf.setTextColor(168, 191, 31);
      pdf.setFontSize(18);
      pdf.text('ATTESTATION TITULAIRE DE CONTRAT', 105, 110, { align: 'center' });

      // Texte principal
      pdf.setTextColor(0, 0, 0); // Noir
      pdf.setFontSize(10);
      const bodyText = `Madame, Monsieur,
        
  Par la présente, GEG atteste qu'en date du ${new Date().toLocaleDateString()} et depuis le ${convertSAPDate(this.selectedContract.ContractStart)}, ${this.currentUser?.firstname} ${this.currentUser?.lastname} est actuellement titulaire d'un contrat auprès de GEG pour le logement situé au  ${this.selectedContract?.AddressCompteur}.
  
  Le présent document peut valoir justificatif de domicile et est établi sur la base des déclarations du titulaire de contrat lors de la souscription.`;

      const formattedText = pdf.splitTextToSize(bodyText, 170);

      // Ajouter l'interligne (espacement entre les lignes)
      let yPosition = 130; // Position de départ pour le texte
      const lineHeight = 6; // Hauteur de ligne (espacement)

      // Afficher chaque ligne avec un espacement
      formattedText.forEach((line: any) => {
        pdf.text(line, 20, yPosition);
        yPosition += lineHeight; // Augmenter la position verticale pour la ligne suivante
      });

      pdf.text(`Merci de votre confiance,`, 150, 180);
      pdf.text(`Votre conseiller GEG`, 150, 185);


      // Sauvegarde du PDF
      pdf.save('justificatif_domicile.pdf');
    };
  }


  navigateToDocument() {
    this.router.navigate(["/documents"]);
  }
}
