import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContactModel } from 'src/app/interfaces/contactModel';
import { Router } from '@angular/router';
import { animation, trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-phone-record',
  templateUrl: './phone-record.component.html',
  styleUrls: ['./phone-record.component.css'],
  animations: [trigger('toggle', [
    state("true", style({
      height: '0',
      overflow: "hidden"
    }))
    , state("false", style({
      minHeight: 0
    })
    ),transition('*=>*',[animate(200)])
  ])]
})
export class PhoneRecordComponent implements OnInit {

  // These are the input fields whose values are set via parent and these values are rendered in the view
  @Input() ContactModel: ContactModel;
  @Input() referenceId:String;

  @Output() deleteEvent = new  EventEmitter<String>();


  toggleState = "true"
  showDeleteIndicator = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log(this.ContactModel)
  }

  editContact() {
    this.router.navigate(['editContact', this.ContactModel._id])
  }
  deleteContact() {
    this.showDeleteIndicator = true;
    this.deleteEvent.emit(this.ContactModel._id);
  }
  changeState() {
    if (this.toggleState == "false") {
      this.toggleState = "true"
    } else {
      this.toggleState = "false"
    }
  }

}
