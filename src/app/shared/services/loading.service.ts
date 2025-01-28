import { Injectable, Input, OnChanges, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService  {

  isLoading = signal(false); // Signal pour gérer l'état global de chargement

  show() {
    this.isLoading.set(true); // Activer le spinner
  }

  hide() {
    this.isLoading.set(false); // Désactiver le spinner
  }
}
