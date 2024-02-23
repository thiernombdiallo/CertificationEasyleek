import { Component, ElementRef, Renderer2 } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-dasboard-resto',
  templateUrl: './dasboard-resto.component.html',
  styleUrls: ['./dasboard-resto.component.css']
})
export class DasboardRestoComponent {

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
    const mobileMenuBtn = this.el.nativeElement.querySelector('.mobileMenuBtn');
    mobileMenuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});
  }

  logout(): void {
    this.authService.logout();
  }
}

