import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  phoneNumber: string = '';

  isSignIn: boolean = true;
  username: string = '';
  password: string = '';
  adresse: string = "";
  registerPassword: string = '';
  showEmailError: boolean = false;
  emailErrorMessage: string = '';

  showPasswordError: boolean = false;
  passwordErrorMessage: string = '';

  constructor(private authService: AuthService, private http: HttpClient, private router: Router) { }

  ngOnInit() {}

  onRegister() {
    const data = {
      name: this.username,
      email: this.email,
      adresse: this.adresse,
      phone: this.phoneNumber,
      password: this.registerPassword,
    };

    this.authService.register(data.name, data.email, data.phone, data.password).subscribe(
      (response) => {
        console.log('Réponse d\'inscription:', response);
        this.login();
      },
      (error) => {
        console.error('Erreur lors de l\'inscription:', error);
        this.handleError(error);
      }
    );
  }

  login() {
    const data = {
      email: this.email,
      password: this.password,
    };

    this.authService.login(data.email, data.password).subscribe(
      (response) => {
        console.log(response);
        if (response.success && response.token) {
          localStorage.setItem('token', response.token);
          this.authService.loggedIn.next(true);

          if (response.role) {
            this.authService.userRole.next(response.role);
          }
        } else if (response.error && response.errorLists) {
          console.error(response.message);
          console.error(response.errorLists);

          if (response.errorLists.email) {
            console.error(response.errorLists.email[0]);
          }

          if (response.errorLists.password) {
            console.error(response.errorLists.password[0]);
          }
        }

        if (response.role === 'profil') {
          this.router.navigate(['profil']);
        }
      },
      (error) => {
        console.error(error);
        this.handleError(error);
      }
    );
  }

  // Méthode pour gérer les erreurs avec SweetAlert
  private handleError(error: any): void {
    Swal.fire({
      icon: 'error',
      title: 'Erreur!',
      text: 'Une erreur s\'est produite. Veuillez réessayer.',
    });
  }

  @ViewChild('container') container!: ElementRef;

  onSignUpClick() {
    this.container.nativeElement.classList.add('sign-up-mode');
  }

  onSignInClick() {
    this.container.nativeElement.classList.remove('sign-up-mode');
  }

  toggleForm() {
    this.isSignIn = !this.isSignIn;
  }
}
