import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseHttpService {

  protected apiUrl: string;

  constructor() {
    this.apiUrl = environment.apiUrl;
  }
}
