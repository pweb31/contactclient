import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../models/contact';
import { ContactService } from '../services/contact.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detailcontact',
  templateUrl: './detailcontact.component.html',
  styleUrls: ['./detailcontact.component.css']
})
export class DetailcontactComponent implements OnInit {
  contact: Contact ={id:null,nom:'',prenom:'',email:'',dateNaissance:null,tel:'',photo:null};
  id:number;
  constructor(private contactsService: ContactService, private route:ActivatedRoute, private router:Router,private location: Location) {
   
   }


  ngOnInit(): void {
    this.id=+this.route.snapshot.params['id'];
    console.log("mon id contact est  :",this.id);
    // this.contactsService.findContactById(this.id).subscribe(data=>this.contact=data);
    // console.log("mon contact :",this.contact);

    this.contactsService.findContactById(this.id)
      .pipe()
      .subscribe(data => {
        console.log("data returned findContactById : ",data);
        this.contact = data;
      }, error => {
        console.log("error returned findContactById : ",error);
      });
  }

  goBack(): void {
    this.location.back();
  }

}
