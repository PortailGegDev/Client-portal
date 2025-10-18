import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { RequestHttpService } from '../../core/http-services/request-http.service';
import { RequestRecission } from '../models/request-rescission.model';
import { RequestReclamation } from '../models/request-reclamation.model';
import { RequestRead } from '../models/request-rescission-read.model';

@Injectable({
    providedIn: 'root'
})

export class RequestService{
    constructor(private requestRescissionHttpService: RequestHttpService){}
//ToDo changer any dans observable par un model
    createRescissionRequest(requestRecission:RequestRecission):Observable<any>{
        return this.requestRescissionHttpService.createRequestRescission(requestRecission);
    }

    getRescissionRequests(contactId: string):Observable<RequestRead[]>{
        return this.requestRescissionHttpService.getRescissionRequest(contactId)
    }

     createReclamationRequest(requestReclamation:RequestReclamation):Observable<any>{
        return this.requestRescissionHttpService.createRequestReclamation(requestReclamation);
    }

     getReclamationRequests(contactId: string):Observable<RequestRead[]>{
        return this.requestRescissionHttpService.getReclamationRequest(contactId)
    }
}