import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import { User } from '../../../shared/models/user.model';
import { Contract } from '../../../shared/models/contract.model';
import { convertSAPDate } from '../../../shared/utils/date-utilities';

@Injectable({
  providedIn: 'root',
})
export class DocGeneratorService {
  
  constructor() { }

  downloadJustifDomicilePDF(currentUser: User, contract: Contract) {
    const pdf = new jsPDF();

    // Ajouter un logo centré (remplace 'logo.png' par ton chemin d'image)
    const img = new Image();
    img.src = '/images/geg-logo.png';

    img.onload = () => {
      // Centré en haut
      pdf.addImage(img, 'PNG', 90, 10, 14, 14);

      // Informations de GEG (en haut à gauche)
      pdf.setFontSize(10);
      pdf.setTextColor(100, 150, 30); // Vert GEG plus foncé
      pdf.text('GEG', 20, 40);
      pdf.setTextColor(0, 0, 0); // Noir
      pdf.text('8 Place Robert Schuman', 20, 45);
      pdf.text('38000 Grenoble', 20, 50);
      pdf.text('04 76 84 20 00', 20, 55);
      pdf.setTextColor(100, 150, 30); // Vert GEG plus foncé
      pdf.text('www.geg.fr', 20, 60);

      pdf.setTextColor(0, 0, 0); // Noir
      pdf.text(`${currentUser?.firstname} ${currentUser?.lastname}`, 120, 60);
      pdf.text(`${contract?.HouseNumber} ${contract?.StreetName}`, 120, 65);
      pdf.text(`${contract?.PostalCode} ${contract?.CityName}`, 120, 70);

      // Titre centré et coloré
      pdf.setTextColor(100, 150, 30); // Vert GEG plus foncé
      pdf.setFontSize(18);
      pdf.text('Votre justificatif de domicile', 20, 100);

      // Texte principal
      pdf.setTextColor(0, 0, 0); // Noir
      pdf.setFontSize(11);
      const bodyText = `Par la présente, GEG atteste que ${currentUser?.firstname} ${currentUser?.lastname} est titulaire d'un contrat d'énergie ${contract?.ContractISU} auprès de GEG pour le logement situé au ${contract?.HouseNumber}, ${contract?.StreetName} ${contract?.CityName} ${contract?.PostalCode}, depuis le ${convertSAPDate(contract?.contstart)}.

Ce contrat a été établi sur la base de ses déclarations. Pour servir et valoir ce que de droit.`;

      const formattedText = pdf.splitTextToSize(bodyText, 170);

      // Ajouter l'interligne (espacement entre les lignes)
      let yPosition = 115; // Position de départ pour le texte
      const lineHeight = 7; // Hauteur de ligne (espacement)

      // Afficher chaque ligne avec un espacement
      formattedText.forEach((line: string) => {
        pdf.text(line, 20, yPosition);
        yPosition += lineHeight; // Augmenter la position verticale pour la ligne suivante
      });

      // Date en bas à gauche
      pdf.text(`Fait le ${new Date().toLocaleDateString()}`, 25, 170);

      // Ajouter une signature à droite
      const signatureImg = new Image();
      signatureImg.src = '/images/Signature.png'; // Chemin vers l'image de signature

      signatureImg.onload = () => {
        // Ajouter l'image de signature
        pdf.addImage(signatureImg, 'PNG', 120, 190, 55, 40);

        // Pied de page
        pdf.setFontSize(8);

        // Calculer la largeur de la page
        const pageWidth = pdf.internal.pageSize.getWidth();

        // Définir la couleur de la ligne en bleu ciel (R: 173, G: 216, B: 230)
        pdf.setDrawColor(173, 216, 230);

        // Dessiner une ligne au-dessus du pied de page
        pdf.line(20, 275, pageWidth - 20, 275); // (x1, y1, x2, y2)

        // Centrer chaque ligne de texte
        const footerText1 = 'Gaz Électricité de Grenoble - Société anonyme d’économie mixte locale au capital de 25 261 782.76€';
        const footerText2 = 'immatriculée au Registre du Commerce et des Sociétés de Grenoble sous le numéro B.331.995.944';
        const footerText3 = '8 Place Robert Schuman - CS 20183 - 38042 Grenoble Cedex 09';

        // Calculer la position x pour centrer le texte
        const textX = pageWidth / 2;

        // Ajouter chaque ligne de texte centrée
        pdf.text(footerText1, textX, 280, { align: 'center' });
        pdf.text(footerText2, textX, 284, { align: 'center' });
        pdf.text(footerText3, textX, 288, { align: 'center' });

        // Sauvegarde du PDF
        pdf.save('justificatif_domicile.pdf');
      };
    };
  }
}