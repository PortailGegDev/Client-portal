import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Bank } from '../../shared/models/bank.model';
import { BankHttpService } from '../../core/http-services/bank-http.service';


@Injectable({
    providedIn: 'root'
  })
  export class BankService {
  constructor(private bankhttpService: BankHttpService) {}

  getCompteBancaire(bpBank: string | null): Observable<Bank | undefined> {
    console.log(`Fetching Compte Bancaire for BusinessPartnerBankID: ${bpBank}`);
    return this.bankhttpService.fetchCompteBancaire(bpBank);
  }

  }