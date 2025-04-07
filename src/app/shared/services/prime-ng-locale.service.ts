import { Injectable } from '@angular/core';
import { PrimeNG } from 'primeng/config';

@Injectable({
  providedIn: 'root'
})
export class PrimeNgLocaleService {

  constructor(private primeNgConfig: PrimeNG) {}

  getFrenchLocale(): any {
    return {
      startsWith: 'Commence par',
      contains: 'Contient',
      notContains: 'Ne contient pas',
      endsWith: 'Se termine par',
      equals: 'Est égal à',
      notEquals: 'Ne vaut pas',
      noFilter: 'Aucun filtre',
      lt: 'Inférieur à',
      lte: 'Inférieur ou égal à',
      gt: 'Supérieur à',
      gte: 'Supérieur ou égal à',
      is: 'Est',
      isNot: 'N\'est pas',
      before: 'Avant',
      after: 'Après',
      apply: 'Appliquer',
      matchAll: 'Correspond à tous',
      matchAny: 'Correspond à l\'un',
      addRule: 'Ajouter une règle',
      removeRule: 'Supprimer une règle',
      accept: 'Accepter',
      reject: 'Rejeter',
      choose: 'Choisir',
      upload: 'Télécharger',
      cancel: 'Annuler',
      dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
      dayNamesShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
      dayNamesMin: ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'],
      monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
      monthNamesShort: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jui', 'Jui', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
      today: 'Aujourd\'hui',
      clear: 'Effacer',
      weekHeader: 'Sem'
    };
  }

  applyFrenchLocale(): void {
    this.primeNgConfig.setTranslation(this.getFrenchLocale());
  }
}
