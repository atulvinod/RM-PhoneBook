import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { stringify } from 'querystring';

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.css']
})
export class NewContactComponent implements OnInit {

  newContactFromGroup: FormGroup;
  constructor(private formBuilder: FormBuilder) { 
    this.newContactFromGroup = this.formBuilder.group({
      name:[],
      phoneNumber: this.formBuilder.array([this.formBuilder.group({id:''})]),
      email:this.formBuilder.array([this.formBuilder.group({id:''})]),
      dateOfBirth:[],
      singlePhoneNumner:[],
      singleEmail:[]

    })
  }

  get numberArrays(){
    return this.newContactFromGroup.get('phoneNumber') as FormArray;
  } 

  get emailArray(){
    return this.newContactFromGroup.get('email') as FormArray;
  }

  //Called when the new number input is to be called
  addPhoneNumberInput(){
    this.numberArrays.push(this.formBuilder.group({id:""}))
  }

  //Called when the number input is to be removed
  removePhoneNumberInput(index){
    this.numberArrays.removeAt(index);
  }

  addEmailInput(){
    this.emailArray.push(this.formBuilder.group({id:""}))
  }

  removeEmailInput(index){
    this.emailArray.removeAt(index);
  }
  createNewContact(){
    console.log(this.newContactFromGroup.valid)
  }

  ngOnInit(): void {
    
  }

}
