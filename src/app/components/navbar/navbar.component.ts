import { Component, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  isScrolled = false;
  mobileOpen = false;
  currentRoute = '/';

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        this.currentRoute = e.urlAfterRedirects;
      });
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.isScrolled = window.scrollY > 80;
  }

  openMobile(): void {
    this.mobileOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeMobile(): void {
    this.mobileOpen = false;
    document.body.style.overflow = '';
  }

  goHome(sectionId?: string): void {
    this.closeMobile();
    if (this.currentRoute !== '/') {
      this.router.navigate(['/']).then(() => {
        setTimeout(() => {
          if (sectionId) this.scrollToId(sectionId);
          else window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
      });
    } else {
      if (sectionId) this.scrollToId(sectionId);
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  goProjects(): void {
    this.closeMobile();
    if (this.currentRoute !== '/projects') {
      this.router.navigate(['/projects']);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  goProducts(): void {
    this.closeMobile();
    if (this.currentRoute !== '/products') {
      this.router.navigate(['/products']);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  private scrollToId(id: string): void {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  isActive(path: string): boolean {
    return this.currentRoute === path;
  }
}
