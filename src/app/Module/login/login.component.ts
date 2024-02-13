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

  // Validate email format
validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate phone number format
validatePhoneNumber(phone: string): boolean {
  const phoneRegex = /^(70|75|76|77|78)[0-9]{7}$/;
  return phoneRegex.test(phone);
}
  onRegister() {

    if (!this.username || !this.registerEmail || !this.adresse || !this.phone || !this.registerPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur!',
        text: 'Veuillez remplir tous les champs.',
      });
      return;
    }
  
    // Validate name length
    if (this.username.length < 3) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur!',
        text: 'Le nom doit contenir au moins 3 caractères.',
      });
      return;
    }
  
    // Validate email format
    if (!this.validateEmail(this.registerEmail)) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur!',
        text: 'Veuillez saisir une adresse e-mail valide.',
      });
      return;
    }
  
    // Validate phone number format
    if (!this.validatePhoneNumber(this.phone)) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur!',
        text: 'Veuillez saisir un numéro de téléphone valide (format : 70xxxxxxx, 75xxxxxxx, 76xxxxxxx, 77xxxxxxx, 78xxxxxxx).',
      });
      return;
    }
  
    // Validate password length
    if (this.registerPassword.length < 8) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur!',
        text: 'Le mot de passe doit contenir au moins 8 caractères.',
      });
      return;
    }
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
    // (error) => {
    //   // console.error('Erreur lors de l\'inscription:', error);
    //   this.handleError(error);
    // }
  );
  }

  login() {
    if (!this.email || !this.password) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur!',
        text: 'Veuillez remplir tous les champs.',
      });
      return;
    }
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
