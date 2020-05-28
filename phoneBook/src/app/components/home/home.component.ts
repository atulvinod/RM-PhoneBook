import { Component, OnInit } from '@angular/core';
import { ContactModel } from 'src/app/interfaces/contactModel';
import { FormGroup } from '@angular/forms';
import { HttpService } from 'src/app/services/httpService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //Define a contacts array 
  contacts: ContactModel[] = [];

  showLoader:boolean = true


  searchForm: FormGroup;
  
  constructor(private httpService: HttpService) {
    
   }

  ngOnInit(): void {

    // when the component is initialized, fetch the contacts from the server
    this.searchForm = new FormGroup({})
    this.httpService.getContacts().subscribe((result: ContactModel[])=>{
      this.contacts = result

      // Hide the loader
      this.showLoader = false;
    })
  }

}
