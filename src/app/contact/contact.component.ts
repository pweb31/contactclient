import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from '../models/contact';
import { ContactService } from '../services/contact.service';
import { Utilisateur } from '../models/utilisateur';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  pagesContacts: any; 
  contacts;
  listcontacts: Contact[];
  listUtilisateurs: Utilisateur[];
  motCle: string='';
  currentPage : number=0;
  size : number=2;
  pages: Array<number>;
  users;
  user;
  selectedUtilisateur: Utilisateur = { id : null , username: null, password: null, email: null, roles: null};


  constructor(private contactsService: ContactService, private router: Router) { 
    // this.checkUser();
    this.contactsService.getAllContacts().subscribe((categories: Contact[])=>{
      this.listcontacts = categories;
      console.log("Liste de contacts : ",this.listcontacts);
    }) 
  }


  ngOnInit() {
    this.listUsers();
    console.log("users list : ",this.listUtilisateurs);
  }

  checkUser() {
    if (localStorage.getItem('currentUser') === undefined || localStorage.getItem('currentUser') === null) {
      alert("user is invalid, redirection");
      console.log("user is invalid, redirection");
      this.router.navigate(['/login']);
      return;
    }
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    console.log("check user : ",this.user);
    console.log("currentUser checked : ",localStorage.getItem('currentUser'));
  }

  listUsers() {
    this.contactsService.getAllUsers().subscribe((users: Utilisateur[])=>{
      this.listUtilisateurs = users;
      console.log("Liste de utilisateurs!! : ",this.listUtilisateurs);
    }) 
  }

  listContacts() {
    this.contactsService.getAllContacts().subscribe(
        (data: any) => {
              this.contacts = data;
          }, error1 => {
              console.log('erreur : ', error1);
          });
  }


  doSearch() {
    this.contactsService.getContacts(this.motCle, this.currentPage, this.size).subscribe(
        (data: any) => {
              this.pagesContacts = data;
              this.pages = new Array(data.totalPages);
          }, error1 => {
              console.log('erreur : ', error1);
          });
  }


  chercher() {
    this.doSearch();
  }


  gotoPage(i: number) {
      this.currentPage = i;
      this.doSearch();
  }


  onEditContact(id: number){
      this.router.navigate(['editContact', id]);
  }

  onDeleteContact(c: Contact){
      const confirm = window.confirm('Etes vous sûre de vouloir supprimer?')
      if(confirm ===true) {
        //Suppression coté back enf, dans la base de données
        this.contactsService.deleteContact(c.id).subscribe(
          data => {
              //suppression coté front (dans la liste des contacts), ici il supprime l'élement c
              this.pagesContacts.content.splice(
                 this.pagesContacts.content.indexOf(c), 1
              );
              console.log(data);
          }, error => {
              console.log(error);
          });
      }

  }

  getUserValueForm(form){
    console.log("form value : ",form.value);
    console.log("form.value.username : ",form.value.username);
		form.value.id = this.selectedUtilisateur.id;
    form.value.username = this.selectedUtilisateur.username;
    form.value.password = this.selectedUtilisateur.password;
    form.value.email = this.selectedUtilisateur.email;
	
}

detailContact(id:number){
  console.log("id du detail :",id);
  this.router.navigate(["/detailContact",id]);
  }
  editContact(id:number){
    this.router.navigate(["/editContact",id]);
    }
  deleteContact(id:number){
  this.contactsService.deleteContact(id)
  .subscribe(data=>{this.ngOnInit();});
  }

}
