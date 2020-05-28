import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { stringify } from 'querystring';
import { HttpService } from 'src/app/services/httpService';
import { ContactModelPayload } from 'src/app/interfaces/contactModelPayload';

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.css']
})
export class NewContactComponent implements OnInit {

  newContactFromGroup: FormGroup;
  constructor(private formBuilder: FormBuilder, private httpService: HttpService) {
    this.newContactFromGroup = this.formBuilder.group({
      name: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      singleNumberInput: ['', Validators.required],
      singleEmailInput: ['', [Validators.required, Validators.email]],
      phoneNumbers: this.formBuilder.array([]),
      emails: this.formBuilder.array([])
    })
  }

  get phoneNumbersArray() {
    return this.newContactFromGroup.get('phoneNumbers') as FormArray;
  }
  get emailArray() {
    return this.newContactFromGroup.get('emails') as FormArray
  }

  addPhoneInput() {
    this.phoneNumbersArray.push(this.formBuilder.control('', [Validators.required]));
  }
  removePhoneInput(value) {
    this.phoneNumbersArray.removeAt(value);
  }

  addEmailInput() {
    this.emailArray.push(this.formBuilder.control('', [Validators.required, Validators.email]));
  }
  removeEmailInput(value) {
    this.emailArray.removeAt(value);
  }

  onSubmit() {
    let name = this.newContactFromGroup.get('name').value;
    let dateOfBirth = this.newContactFromGroup.get('dateOfBirth').value;


    // Get the numbers array from the form
    let phoneNumbers = this.newContactFromGroup.get('phoneNumbers').value;
    //push the numbers element which is mandatory
    phoneNumbers.push(this.newContactFromGroup.get('singleNumberInput').value)


    // Get the numbers element which is mandatory
    let emails = this.newContactFromGroup.get('emails').value;
    //push the numbers element which is mandatory
    emails.push(this.newContactFromGroup.get('singleEmailInput').value);

    // request to be forwareded to the server
    var request: ContactModelPayload = {
      name,
      dateOfBirth,
      phoneNumber: phoneNumbers,
      email: emails,
  
    }

    this.httpService.createNewContact(request).subscribe(result=>{
      console.log(result);
    })



  }

  ngOnInit(): void {

  }

}
