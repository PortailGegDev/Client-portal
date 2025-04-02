import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Bank } from '../../../shared/models/bank.model';
import { BankHttpService } from '../../../core/http-services/bank-http.service';


@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(private bankhttpService: BankHttpService) { }

  getCompteBancaire(businessPartner: string | null): Observable<Bank[]> {
    return this.bankhttpService.fetchCompteBancaire(businessPartner);
  }
}