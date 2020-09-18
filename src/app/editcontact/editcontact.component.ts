import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../models/contact';
import { ContactService } from '../services/contact.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-editcontact',
  templateUrl: './editcontact.component.html',
  styleUrls: ['./editcontact.component.css']
})
export class EditcontactComponent implements OnInit {

  constructor(private contactsService: ContactService, private route:ActivatedRoute, private router:Router,private location: Location) { }
  contact: Contact ={id:null,nom:'',prenom:'',email:'',dateNaissance:null,tel:'',photo:null};
  id:number;
  errorMessage: string;
  ngOnInit(): void {
    this.id=+this.route.snapshot.params['id'];
    this.contactsService.findContactById(this.id)
      .pipe()
      .subscribe(data => {
        console.log("data returned findContactById : ",data);
        this.contact = data;
      }, error => {
        console.log("error returned findContactById : ",error);
      });
  }

  saveContact(idCont:number){
    console.log('id before editContact',idCont);
    this.contactsService.updateContactById(idCont)
      .subscribe(data => {
        console.log("success update")
        this.contact=data;
      }, 
        error => {
        console.log("error after update : ",error);
      });
    }

    goBack(): void {
      this.location.back();
    }



}
