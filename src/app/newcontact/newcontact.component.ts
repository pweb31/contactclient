import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-newcontact',
  templateUrl: './newcontact.component.html',
  styleUrls: ['./newcontact.component.css']
})
export class NewcontactComponent implements OnInit {

  contact={nom:"",prenom:"",email:"",dateNaissance:null,tel:"",photo:null};

  errorMessage: string;

  constructor(private contactsService: ContactService,private location: Location) { 

  }

  ngOnInit(): void {
  }
  // saveContact(){
  //   this.contactsService.ajoutContact(this.contact)
  //   .subscribe(data=>{this.contact=data;});
  //   }

    saveContact(){
      this.errorMessage = "";
      this.contactsService.ajoutContact(this.contact)
        .subscribe(data => {
          this.errorMessage = "Ajout du nouveau contact effectué avec succès ";
          console.log("success added new contact")
          this.contact=data;
        }, 
          error => {
            console.log("error after added new contact : ",error);
            this.errorMessage = "Problème pour l\'ajout du contact ";
           return;
          
        });
      }

      goBack(): void {
        this.location.back();
      }

}
