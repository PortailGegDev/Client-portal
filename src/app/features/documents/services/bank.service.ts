import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Bank } from '../../../shared/models/bank.model';
import { BankHttpService } from '../../../core/http-services/bank-http.service';
import { UpdateRib } from '../../../shared/models/update-rib.model';


@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(private bankhttpService: BankHttpService) { }

  getCompteBancaire(businessPartner: string | null): Observable<Bank[]> {
    return this.bankhttpService.fetchCompteBancaire(businessPartner);
  }

  createCompteBancaire(updateRib: UpdateRib): Observable<Bank | null> {
    return this.bankhttpService.createCompteBancaire(updateRib);
  }
}