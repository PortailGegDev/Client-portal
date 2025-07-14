import { Injectable } from '@angular/core';
import { ProfilHttpService } from '../../core/http-services/profil-http.service';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { Profil } from '../models/profil.model';
import { SalesforceContact } from '../models/salsforceContact.model';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  private contactIdSubject = new BehaviorSubject<string | null>(null);
  contactId$ = this.contactIdSubject.asObservable();
  constructor(private profilhttpService: ProfilHttpService) { }

  getProfil(bp: string | null): Observable<Profil | undefined> {
    console.log(`Fetching profile for BusinessPartnerId: ${bp}`);
    return this.profilhttpService.fetchPerson(bp);
  }

  getCoTitularProfil(bpList: string[]): Observable<Profil[]> {
    if (bpList.length === 0) {
      return of([]);
    }

    let filter: string = `BusinessPartnerId eq '${bpList[0]}'`;

    bpList.forEach((element: string) => {
      if (bpList.indexOf(element) === 0) {
        return;
      }

      filter = filter + ` or BusinessPartnerId eq '${element}'`;
    }); 
    
    console.log(`Fetching profile for BusinessPartnerId list: ${bpList}`);

    return this.profilhttpService.fetchPersonByFilter(filter);
  }

    // Méthode pour récupérer le contact en fonction du BusinessPartner
    // fetchContact(businessPartner: string): Observable<SalesforceContact> {
    //   return this.profilhttpService.getContactByBusinessPartner(businessPartner);
    // }

    fetchContact(businessPartner: string): Observable<SalesforceContact> {
      return this.profilhttpService.getContactByBusinessPartner(businessPartner).pipe(
        tap(contact => {
          this.contactIdSubject.next(contact.Id);  // ✅ sauvegarde du contactId
        })
      );
    }
  
    getCurrentContactId(): string | null {
      return this.contactIdSubject.value;
    }

    getContactByBp(businessPartner: string): Observable<SalesforceContact> {
      return this.profilhttpService.getContactByBusinessPartner(businessPartner);
    }
}
