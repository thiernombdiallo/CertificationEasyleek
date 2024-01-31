import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent {
  isAdmin: boolean = true; 
  isRestaurateur: boolean = false; 

  constructor(private authService: AuthService) { }
  ngOnInit() {
    // Obtenez le rôle de l'utilisateur depuis le service d'authentification
    this.authService.usersRole.subscribe(role => {
      this.isAdmin = role === 'admin';
      this.isRestaurateur = role === 'restaurateur';
    });
  }
}

