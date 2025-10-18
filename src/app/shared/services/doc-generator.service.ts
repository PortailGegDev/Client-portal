import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import { User } from '../models/user.model';
import { Contract } from '../models/contract/contract.model';
import { convertSAPDate } from '../utils/date-utilities';
import { ContractService } from './contract.service';
import { ProfilService } from './profil.service';
import { Profil } from '../models/profil.model';

@Injectable({
  providedIn: 'root',
})
export class DocGeneratorService {
  constructor(
    private contractService: ContractService,
    private profilService: ProfilService
  ) { }

  downloadJustifDomicilePDF(currentUser: User, contract: Contract) {
    const pdf = new jsPDF();

    // Ajouter le logo
    const img = new Image();
    img.src = '/images/geg-logo.png';

    img.onload = () => {
      pdf.addImage(img, 'PNG', 95, 10, 15, 20);

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
      // TODO : Remplacer contract?.ContractISU par product name
      const bodyText = `Par la présente, GEG atteste que ${currentUser?.firstname} ${currentUser?.lastname} est titulaire d'un contrat d'énergie ${contract?.ContractISU} auprès de GEG pour le logement situé au ${contract?.AddressCompteur}, depuis le ${convertSAPDate(contract?.contstart)}.`

      let formattedText = pdf.splitTextToSize(bodyText, 170);

      // Ajouter l'interligne (espacement entre les lignes)
      let yPosition = 115; // Position de départ pour le texte
      const lineHeight = 7; // Hauteur de ligne (espacement)

      // Afficher chaque ligne avec un espacement
      formattedText.forEach((line: string) => {
        pdf.text(line, 20, yPosition);
        yPosition += lineHeight; // Augmenter la position verticale pour la ligne suivante
      });

      yPosition += 4;
      // 🔹 Récupérer et afficher les co-titulaires
      this.contractService.getContractCotitulaire(contract.ContractISU).subscribe({
        next: (contracts: Contract[]) => {

          const coTitulairesBpList = contracts.map(item => item.PartnerId);

          this.profilService.getCoTitularProfil(coTitulairesBpList).subscribe({
            next: (profiles: Profil[]) => {
              // // 🔹 Si la liste est vide → injecte un mock
              // if (profiles.length === 0) {
              //   profiles = [{ FirstName: 'Ali', LastName: 'BEN SALEM' } as Profil];
              // }
              // Titre de la section
              if (profiles.length > 0) {
                pdf.setFontSize(12);
                pdf.text('Co-titulaire(s) :', 20, yPosition);
                yPosition += lineHeight;


                // Liste à puces des co-titulaires
                profiles.forEach((profil: Profil, index: number) => {
                  const fullName = `${profil.FirstName} ${profil.LastName}`;
                  pdf.text(`• ${fullName}`, 25, yPosition); // puce + nom
                  yPosition += lineHeight;
                });
                yPosition += 4; // petit espace après la liste

              }

              yPosition += 4; // petit espace après la liste

              // 🔹 Phrase finale APRES les co-titulaires
              const finalText = `Ce contrat a été établi sur la base de ses déclarations. Pour servir et valoir ce que de droit.`;
              let finalFormatted = pdf.splitTextToSize(finalText, 170);

              finalFormatted.forEach((line: string) => {
                pdf.text(line, 20, yPosition);
                yPosition += lineHeight;
              });

              yPosition += 10; // petit espace après 

              // Date en bas
              pdf.text(`Fait le ${new Date().toLocaleDateString()}`, 25, yPosition);

              // Signature
              const signatureImg = new Image();
              signatureImg.src = '/images/Signature.png';
              signatureImg.onload = () => {
                const maxWidth = 51;
                const maxHeight = 63;
                const ratio = Math.min(
                  maxWidth / signatureImg.width,
                  maxHeight / signatureImg.height
                );
                pdf.addImage(
                  signatureImg,
                  'PNG',
                  100,
                  190,
                  signatureImg.width * ratio,
                  signatureImg.height * ratio
                );

                // Pied de page
                pdf.setFontSize(8);
                const pageWidth = pdf.internal.pageSize.getWidth();
                pdf.setDrawColor(173, 216, 230);
                pdf.line(20, 275, pageWidth - 20, 275);

                const footerText1 =
                  'Gaz Électricité de Grenoble - Société anonyme d’économie mixte locale au capital de 25 261 782.76€';
                const footerText2 =
                  'Immatriculée au RCS de Grenoble sous le numéro B.331.995.944';
                const footerText3 =
                  '8 Place Robert Schuman - CS 20183 - 38042 Grenoble Cedex 09';

                const textX = pageWidth / 2;
                pdf.text(footerText1, textX, 280, { align: 'center' });
                pdf.text(footerText2, textX, 284, { align: 'center' });
                pdf.text(footerText3, textX, 288, { align: 'center' });

                pdf.save('justificatif_domicile.pdf');
              };
            },
          });
        },
      });
    };
  }
}
