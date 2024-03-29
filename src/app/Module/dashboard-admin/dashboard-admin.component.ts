import { Component, ElementRef, Renderer2 } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';


@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent {

  constructor(private renderer: Renderer2, private el: ElementRef , private authService: AuthService
  ) {}

  ngAfterViewInit(): void {
    const sidebar = this.el.nativeElement.querySelector('.sidebar');
    const sidebarBtn = this.el.nativeElement.querySelector('.sidebarBtn');

    sidebarBtn.addEventListener('click', () => {
      sidebar.classList.toggle('active');

      if (sidebar.classList.contains('active')) {
        this.renderer.removeClass(sidebarBtn, 'bx-menu');
        this.renderer.addClass(sidebarBtn, 'bx-menu-alt-right');
      } else {
        this.renderer.removeClass(sidebarBtn, 'bx-menu-alt-right');
        this.renderer.addClass(sidebarBtn, 'bx-menu');
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }
}



