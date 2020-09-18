import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Contact } from '../models/contact';
import { Utilisateur } from '../models/utilisateur';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<Utilisateur>('http://localhost:8080/users');
  }

  // readCategories(): Observable<Categorie[]>{
	// 	return this.httpClient.get<Categorie[]>(`${this.PHP_API_SERVER}/index.php`);
  // }
  
  JAVA_API_SERVER = "http://localhost:8080";

  ajoutContact(contact: any) {
    return this.http.post<Contact>(`${this.JAVA_API_SERVER}/contact/ajout`, contact);
  }

 
  
  getAllContacts(): Observable<Contact[]> {
    // return this.http.get<Contact[]>('http://localhost:8080/contacts');
    return this.http.get<Contact[]>(`${this.JAVA_API_SERVER}/contacts`);
  }

  getAllUsers(): Observable<Utilisateur[]> {
    // return this.http.get<Contact[]>('http://localhost:8080/contacts');
    return this.http.get<Utilisateur[]>(`${this.JAVA_API_SERVER}/users`);
  }

  findContactById(idContact: number) {
    return this.http.get<Contact>(`${this.JAVA_API_SERVER}/contacts/` + idContact);
  }

  updateContactById(idContact: number) {
    return this.http.get<Contact>(`${this.JAVA_API_SERVER}/contacts/update/` + idContact);
  }

  deleteContact(idContact: number) {
    return this.http.get<Contact>(`${this.JAVA_API_SERVER}/contact/delete/` + idContact);
  }

  getContacts(motCle: string, page: number, size: number) {
      return this.http.get<Contact>('http://localhost:8080/chercherContacts?mc='+motCle+'&page='+page+'&size='+size);
    }


  getContact(id: number) {
      return this.http.get<Contact>('http://localhost:8080/contacts/' + id)
  }

  saveContact(contact: any) {
      return this.http.post<Contact>('http://localhost:8080/contacts/save', contact);
  }

  updateContact(contact: Contact) {
      return this.http.put<Contact>('http://localhost:8080/contacts/update/'+ contact.id, contact)
  }

  // deleteContact(id: number) {
  //     return this.http.delete<Contact>('http://localhost:8080/contacts/delete/'+ id)
  // }

}
