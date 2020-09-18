import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage: string;
  loginForm: FormGroup;
  constructor(private authentService : AuthenticationService, private formBuilder: FormBuilder, private router: Router) { 
    this.loginForm = formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  loginUser() {
    this.errorMessage = "";
    if (this.loginForm.invalid) {
      this.errorMessage = "EMail and / or password is incorrect";
      return;
    }
    this.authentService.login(this.login.value, this.password.value)
      .pipe()
      .subscribe(data => {
        // Vérifier que login/mdp sont correctes, par exemple par une requête à un service REST
        //localStorage.setItem('user', JSON.stringify({login : this.model.username}));
        //this.router.navigate(['/home']);
        console.log("data returned : ",data);
        localStorage.setItem('currentUser', JSON.stringify(data));
        this.router.navigate(['/contacts']);
      }, error => {
        console.log('error code :',error);
        if(error.status === 404) {
          this.errorMessage = "No user was found with the following Email/Password";
        }
        if(error.status === 400) {
          this.errorMessage = "EMail and / or password is incorrect";
        }
      });
  }

  get login() {
    return this.loginForm.get('login');
  }

  get password() {
    return this.loginForm.get('password');
  }

}
