import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseHttpService {

  protected apiUrl: string;
  protected apiUrlContractList: string;

  constructor() {
    this.apiUrl = environment.apiUrl;
    this.apiUrlContractList = environment.apiUrlContractList;
  }
}
