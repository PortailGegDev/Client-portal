import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Mandate } from '../../../shared/models/mandate.model';
import { MandateHttpService } from '../../../core/http-services/mandate-http.service';
import { CreateMandat } from '../../../shared/models/create-mandat.model';


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


  createMandat(createMandat: CreateMandat): Observable<any> {
    return this.mandatehttpService.createMandat(createMandat);
  }

  generateSEPAMandate(contractISU: string, businessPartner: string): string {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');

    const formatted =
      pad(now.getDate()) +
      pad(now.getMonth() + 1) +
      now.getFullYear() +
      pad(now.getHours()) +
      pad(now.getMinutes());

    return `RUM${contractISU}${businessPartner}${formatted}`;
  }
}