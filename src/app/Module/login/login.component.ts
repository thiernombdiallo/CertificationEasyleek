import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('container') container!: ElementRef;

  ngOnInit() {
    // Initialisation du composant
  }

  onSignUpClick() {
    this.container.nativeElement.classList.add('sign-up-mode');
  }

  onSignInClick() {
    this.container.nativeElement.classList.remove('sign-up-mode');
  }
  isSignIn: boolean = true;

  toggleForm() {
    this.isSignIn = !this.isSignIn;
  }
}

