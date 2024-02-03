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
  phone: string = '';

  isSignIn: boolean = true;
  username: string = '';
  password: string = '';
  adresse: string = "";
  registerPassword: string = '';
  registerEmail: string = '';
  showEmailError: boolean = false;
  emailErrorMessage: string = '';
  showPasswordError: boolean = false;
  passwordErrorMessage: string = '';

  constructor(private authService: AuthService, private http: HttpClient, private router: Router) { }

  ngOnInit() {}

  onRegister() {
  const data = {
    name: this.username,
    email: this.registerEmail,
    adresse: this.adresse,
    phone: this.phone,
    password: this.registerPassword,
  };

  this.authService.register(data.name, data.email, data.adresse , data.phone, data.password).subscribe(
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
        console.log(response.user)
        console.log(response.token);
        localStorage.setItem('token', JSON.stringify(response.token).replace(/['"]+/g, ''));
        
        if (response.user.role_id === 1) {
              this.router.navigate(['/adminSysteme']);
            } else if (response.user.role_id === 2) {
              this.router.navigate(['/menuResto']);
            } else if (response.user.role_id === 3) {
              this.router.navigate(['/accueil']);
            } else {
              console.error("Rôle non reconnu :", response.user.role);
            }
            ;
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
  logout(): void {
    this.authService.logout();
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
