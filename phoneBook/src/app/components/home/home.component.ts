import { Component, OnInit } from '@angular/core';
import { ContactModel } from 'src/app/interfaces/contactModel';

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


  constructor() { }

  ngOnInit(): void {
    
  }

}
