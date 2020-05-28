import { Component, OnInit } from '@angular/core';
import { ContactModel } from 'src/app/interfaces/contactModel';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //Define a contacts array 
  contacts: ContactModel[] = [
    {name:"Jhon Doe",phoneNumber:["00000"],email:["atulvinod"],dateOfBirth:"11"}
  ];


  searchForm:FormGroup;
  
  constructor() { }

  ngOnInit(): void {
    this.searchForm = new FormGroup({})
  }

}
