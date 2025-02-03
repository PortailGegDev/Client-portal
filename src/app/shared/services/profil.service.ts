import { Injectable } from '@angular/core';
import { ProfilHttpService } from '../../core/http-services/profil-http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  constructor(private profilhttpService: ProfilHttpService) { }

  getProfil(bp: string):Observable<any>{
    return this.profilhttpService.fetchPerson(bp);
  }
}
