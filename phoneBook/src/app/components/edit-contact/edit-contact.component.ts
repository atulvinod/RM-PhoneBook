import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { HttpService } from 'src/app/services/httpService';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';

import { ContactModel } from 'src/app/interfaces/contactModel';


@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

  editFormGroup: FormGroup
  contactId: string;

  constructor(private router: Router, private routerSnapShot: ActivatedRoute, private http: HttpService, private formBuilder: FormBuilder) {

    this.editFormGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      phoneNumber: this.formBuilder.array([]),
      emails: this.formBuilder.array([])
    })



  }
  addPhoneInput(value){
    let newInputControl = this.formBuilder.control(value,[Validators.required]);
    this.getPhoneInputsArray.push(newInputControl);
  }
  addEmailInput(value){
    let newInputControl = this.formBuilder.control(value,[Validators.required,Validators.email])
    this.getEmailInputsArray.push(newInputControl);
  }

 get getEmailInputsArray(){
    return this.editFormGroup.get('emails') as FormArray
  }

  get getPhoneInputsArray(){
    return this.editFormGroup.get('phoneNumber') as FormArray
  }

  deleteNumber(index){

    this.getPhoneInputsArray.removeAt(index);
    console.log(this.getPhoneInputsArray.length)
    if(this.getPhoneInputsArray.length==0){
      this.addPhoneInput('');
    }
  }

  deleteEmail(index){
    this.getEmailInputsArray.removeAt(index);
    if(this.getEmailInputsArray.length==0){
      this.addEmailInput('');
    }
  }

  ngOnInit(): void {

    this.contactId = this.routerSnapShot.snapshot.paramMap.get('id');
    this.http.getSingleContact(this.contactId).subscribe((result: ContactModel) => {

      this.editFormGroup.get('name').setValue(result.name);
      this.editFormGroup.get('dateOfBirth').setValue(result.dateOfBirth);

      result.email.forEach((element,index,array)=>{
        this.addEmailInput(element)
      })

      result.phoneNumber.forEach((element,index,array)=>{
        this.addPhoneInput(element);
      })

    })
  }

  onSubmit(){
    let name = this.editFormGroup.get('name').value;
    let dateOfBirth = this.editFormGroup.get('dateOfBirth').value;
    let phoneNumber = this.editFormGroup.get('phoneNumber').value;
    let email = this.editFormGroup.get('emails').value;
    let _id = this.contactId;
    let requestForUpdate:ContactModel = {
      name,
      dateOfBirth,
      phoneNumber,
      email,
      _id
    }
    console.log(requestForUpdate)
    this.http.updateContact(requestForUpdate).subscribe(result=>{
      
    })
  }

}
