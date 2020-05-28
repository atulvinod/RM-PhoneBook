import { Injectable } from "@angular/core";

import {HttpClient} from '@angular/common/http'
import { ContactModel } from '../interfaces/contactModel';
@Injectable({
    providedIn:'root'
})
export class HttpService{


    constructor(private http: HttpClient){

    }

    createNewContact(data: ContactModel){
        return this.http.post('api/newContact',data);
    }
}