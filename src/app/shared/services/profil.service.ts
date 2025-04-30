import { Injectable } from '@angular/core';
import { ProfilHttpService } from '../../core/http-services/profil-http.service';
import { Observable, of } from 'rxjs';
import { Profil } from '../models/profil.model';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

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
}
