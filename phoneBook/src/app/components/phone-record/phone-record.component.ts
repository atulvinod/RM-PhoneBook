import { Component, OnInit, Input } from '@angular/core';
import { ContactModel } from 'src/app/interfaces/contactModel';

@Component({
  selector: 'app-phone-record',
  templateUrl: './phone-record.component.html',
  styleUrls: ['./phone-record.component.css']
})
export class PhoneRecordComponent implements OnInit {

  // These are the input fields whose values are set via parent and these values are rendered in the view
  @Input() ContactModel: ContactModel;

  constructor() { }

  ngOnInit(): void {
    console.log(this.ContactModel)
  }

}
