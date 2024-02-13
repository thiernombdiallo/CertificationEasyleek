import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  constructor(private authService: AuthService
    ) {}

  ngOnInit(): void {
    console.log('ProfilComponent rendered');
  }
  logout(): void {
    this.authService.logout();
  }
  }
