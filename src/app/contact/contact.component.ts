import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from '../models/contact';
import { ContactService } from '../services/contact.service';
import { Utilisateur } from '../models/utilisateur';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

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
  dtOptions: any = {};
  selectedUtilisateur: Utilisateur = { id : null , username: null, password: null, email: null, roles: null};


  constructor(private contactsService: ContactService, private router: Router, private location: Location) { 
    // this.checkUser();
    this.contactsService.getAllContacts().subscribe((categories: Contact[])=>{
      this.listcontacts = categories;
      console.log("Liste de contacts : ",this.listcontacts);
    }) 
  }


  ngOnInit() {
    this.initDataTables();
    this.listUsers();
    console.log("users list : ",this.listUtilisateurs);
  }

  initDataTables() {
    this.dtOptions = {
    //   language: {
    //     processing:     "Traitement en cours...",
    //     search:         "Rechercher&nbsp;:",
    //     lengthMenu:    "Afficher _MENU_ &eacute;l&eacute;ments",
    //     info:           "Affichage de l'&eacute;lement _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
    //     infoEmpty:      "Affichage de l'&eacute;lement 0 &agrave; 0 sur 0 &eacute;l&eacute;ments",
    //     infoFiltered:   "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
    //     infoPostFix:    "",
    //     loadingRecords: "Chargement en cours...",
    //     zeroRecords:    "Aucun &eacute;l&eacute;ment &agrave; afficher",
    //     emptyTable:     "Aucune donnée disponible dans le tableau",
    //     paginate: {
    //         first:      "Premier",
    //         previous:   "Pr&eacute;c&eacute;dent",
    //         next:       "Suivant",
    //         last:       "Dernier"
    //     },
    //     aria: {
    //         sortAscending:  ": activer pour trier la colonne par ordre croissant",
    //         sortDescending: ": activer pour trier la colonne par ordre décroissant"
    //     }
    // },
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu : [5, 10, 25],
      processing: true,
    };
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

  deleteuser(id:number)
{


  Swal.fire({
    title: 'Voulez-vous supprimer ce contact?',
    //text: 'You will not be able to recover this file!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Supprimer!',
    cancelButtonText: 'Annuler'
  }).then((result) => {
    if (result.value) {
       return this.contactsService.deleteContact(id).subscribe(data => {
        Swal.fire(
          'Effectué!',
          'Le contact a été supprimé.',
          'success'
        )
       // this.router.navigate(["/contacts"]);
       //this.ngOnInit();
       location.reload();
  },error => {
    console.log("Erreur lors de la suppression du contact : ",error);
  });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Cancelled',
        'Your imaginary file is safe :)',
        'error'
      )
    }
  })


//  return this.contactsService.deleteContact(id).subscribe(data => {
//     Swal.fire({
//       title: 'Hurray!!',
//       text:   "User has been deleted successfully.",
//       icon: 'success'
//     });
    
//   },error => {
//     console.log("Form error : ",error);
//   });
}

}
