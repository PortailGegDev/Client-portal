import { Injectable } from '@angular/core';
import { ProfilHttpService } from '../../core/http-services/profil-http.service';
import { Observable } from 'rxjs';
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
}
