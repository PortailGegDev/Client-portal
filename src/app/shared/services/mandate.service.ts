import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Mandate } from '../../shared/models/mandate.model';
import { MandateHttpService } from '../../core/http-services/mandate-http.service';


@Injectable({
    providedIn: 'root'
  })
  export class MandateService {
  constructor(private mandatehttpService: MandateHttpService) {}

  getMandate(bpBank: string | null): Observable<Mandate| undefined> {
    console.log(`Fetching Mandate for BusinessPartnerBankID: ${bpBank}`);
    return this.mandatehttpService.fetchMandate(bpBank);
  }

  }