import { AfterViewInit, Component, ElementRef, Renderer2,} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.configurerMenuMobile();
  }

  configurerMenuMobile() {
    const menuToggleElement = this.el.nativeElement.querySelector('.menu-toggle');

    this.renderer.listen(menuToggleElement, 'click', (event) => this.toggleMenuMobile(event));
  }

  toggleMenuMobile(event: Event) {
    event.preventDefault();

    const menuToggleElement:any = event.currentTarget;
    const parentElement = this.renderer.parentNode(menuToggleElement);
    const menuElement = parentElement.querySelector('.menu');

    if (menuElement.classList.contains('expanded-mobile-menu')) {
      menuToggleElement.classList.remove('expanded-menu-toggle');
      parentElement.classList.remove('nav-expanded');
      menuElement.classList.remove('expanded-mobile-menu');
    } else {
      menuToggleElement.classList.add('expanded-menu-toggle');
      parentElement.classList.add('nav-expanded');
      menuElement.classList.add('expanded-mobile-menu');
    }
  }
}