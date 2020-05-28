import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NewContactComponent } from './components/new-contact/new-contact.component';


const routes: Routes = [{
  path:"",
  component:HomeComponent,
},{
  path:"addNewContact",
  component:NewContactComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
