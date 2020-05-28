import { Component, OnInit } from '@angular/core';
import { ContactModel } from 'src/app/interfaces/contactModel';
import { FormGroup } from '@angular/forms';
import { HttpService } from 'src/app/services/httpService';
import { element } from 'protractor';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //this array contains all the data that is fetched from the server
  allContacts: ContactModel[] = [];

  pagenatedResults: ContactModel[][] = [];

  totalPages = 0;
  currentPage = 0;

  showLoader:boolean = true




  searchForm: FormGroup;
  
  constructor(private httpService: HttpService) {
    
   }

   // this function pagenates the array
   pagenateResults(array:ContactModel[]){
    this.pagenatedResults = []
    let onepage:ContactModel[] = [];
    let pageCounter = 0;
    for(let i = 0 ; i < array.length ; i++ ){
      if((i+1)%4==0){
        onepage.push(array[i]);
        this.pagenatedResults.push(onepage);
        onepage = [];
        pageCounter++;
        continue;
      }
      onepage.push(array[i])
    }
    this.pagenatedResults.push(onepage)
    this.totalPages = this.pagenatedResults.length;
    
   }

   choosePage(value){
      this.currentPage = value;
      
   }
   deleteContact(id){
     
     this.httpService.deleteContact(id).subscribe((result)=>{
       if(result['status']=='success'){
        let index = 0;
        console.log("Delete",id)
       
        this.allContacts = this.allContacts.filter((element)=>{
          if(element._id!=id){
            return element;
          }
        })
        this.pagenateResults(this.allContacts);
       }


     })
   }

   nextPage(){
      if(this.currentPage + 1 < this.pagenatedResults.length){
        this.currentPage ++;
      }
   }
   previousPage(){
    if(this.currentPage - 1 >= 0){
      this.currentPage--;
    }
   }

  ngOnInit(): void {

    // when the component is initialized, fetch the contacts from the server
    this.searchForm = new FormGroup({})
    this.httpService.getContacts().subscribe((result: ContactModel[])=>{
      console.log(result)
      this.allContacts = result;
      this.pagenateResults(this.allContacts);
      // Hide the loader
      this.showLoader = false;
    })
  }

}
