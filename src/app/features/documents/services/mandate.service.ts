import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Mandate } from '../../../shared/models/mandate.model';
import { MandateHttpService } from '../../../core/http-services/mandate-http.service';


@Injectable({
  providedIn: 'root'
})
export class MandateService {

  constructor(private mandatehttpService: MandateHttpService) { }

  getMandate(bpBank: string[]): Observable<Mandate[]> {
    let filter = `BusinessPartnerBankId eq '${bpBank[0]}'`;
    bpBank.forEach((element: string) => {
      if (bpBank.indexOf(element) === 0) {
        return;
      }

      filter = filter + ` or BusinessPartnerBankId eq '${element}'`;
    });

    return this.mandatehttpService.fetchMandate(filter);
  }
}