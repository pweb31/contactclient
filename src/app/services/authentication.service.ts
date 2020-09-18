import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utilisateur } from '../models/utilisateur';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  JAVA_API_SERVER = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<Utilisateur>('http://localhost:8080/users');
  }

  getAllUsers(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${this.JAVA_API_SERVER}/users`);
  }

  login(email: string, password: string) {
    //return this.http.post<Utilisateur>(AppSettings.APP_URL + "/users/login?mail=" + mail + "&password=" + password, null);
    return this.http.post<Utilisateur>(`${this.JAVA_API_SERVER}/login?email=`+ email+ `&password=` + password,null);
  }

}
