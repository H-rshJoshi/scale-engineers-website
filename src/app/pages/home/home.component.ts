import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './home.component.html'
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  private observers: IntersectionObserver[] = [];
  private slideshowTimer: ReturnType<typeof setInterval> | null = null;
  formMsg = '';
  formMsgVisible = false;
  private msgTimer: ReturnType<typeof setTimeout> | null = null;

  /** Hero background slideshow images — file names match the projects page */
  heroSlides = [
    'wtp-170mld-warangal.jpg',
    'wtp-130mld-bhubaneswar-aerial.jpg',
    'wtp-84mld-uddanam-2.jpg',
    'wtp-39mld-patiala.jpg',
    'wtp-12mld-patiala.jpg'
  ];
  activeSlide = 0;

  clients = ['MEIL – Megha Engineering','L&T Construction','Kalpataru Power Transmission',
    'KEC International','SPML Infra Ltd.','GVPR Engineers','JMC Projects India',
    'GKC Projects','Tatva Environmental','LC Infra Projects','Gaja Engineering',
    'P.C. Snehal Group','Vraj Construction','ZECPL'];

  states = ['Gujarat','Madhya Pradesh','Rajasthan','Punjab','Telangana','Andhra Pradesh',
    'Karnataka','Uttar Pradesh','Uttarakhand','Mizoram','Jharkhand','Odisha',
    'Chhattisgarh','West Bengal','Goa'];

  values = ['Openness & Trust','Integrity & Reliability','Teamwork & Collaboration','Commitment & Creativity'];

  stats = [
    { target: 50, suffix: '+', label: 'Projects Completed' },
    { target: 15, suffix: '', label: 'States Covered' },
    { target: 10, suffix: '+', label: 'Years of Expertise' },
    { target: 0, suffix: '170 MLD', label: 'Largest Plant Designed', fixed: true }
  ];

  ngAfterViewInit(): void {
    this.initReveal();
    this.initCounters();
    this.initSlideshow();
  }

  private initSlideshow(): void {
    this.startSlideshow();
  }

  private startSlideshow(): void {
    if (this.slideshowTimer) clearInterval(this.slideshowTimer);
    // Cycle through hero background images every 5 seconds
    this.slideshowTimer = setInterval(() => {
      this.activeSlide = (this.activeSlide + 1) % this.heroSlides.length;
    }, 5000);
  }

  /** Manually jump to a slide when a dot is clicked, then restart the auto-timer */
  goToSlide(index: number): void {
    this.activeSlide = index;
    this.startSlideshow();
  }

  ngOnDestroy(): void {
    this.observers.forEach(o => o.disconnect());
    if (this.msgTimer) clearTimeout(this.msgTimer);
    if (this.slideshowTimer) clearInterval(this.slideshowTimer);
  }

  private initReveal(): void {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const siblings = Array.from(e.target.parentElement?.children || []);
          const delay = Math.min(siblings.indexOf(e.target as Element) * 70, 420);
          setTimeout(() => e.target.classList.add('visible'), delay);
        }
      });
    }, { threshold: 0.07, rootMargin: '0px 0px -36px 0px' });
    document.querySelectorAll('.reveal,.reveal-l,.reveal-r').forEach(el => obs.observe(el));
    this.observers.push(obs);
  }

  private initCounters(): void {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target as HTMLElement;
          const target = parseInt(el.dataset['target'] || '0');
          if (target) this.animateNum(el, target);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('[data-target]').forEach(el => obs.observe(el));
    this.observers.push(obs);
  }

  private animateNum(el: HTMLElement, target: number): void {
    const span = el.querySelector('span');
    if (!span) return;
    let n = 0;
    const step = Math.max(1, Math.floor(target / 55));
    const t = setInterval(() => {
      n = Math.min(n + step, target);
      span.textContent = String(n);
      if (n >= target) clearInterval(t);
    }, 28);
  }

  handleSubmit(event: Event): void {
    event.preventDefault();
    this.formMsg = '✓ Message sent! We will respond within 24 hours.';
    this.formMsgVisible = true;
    (event.target as HTMLFormElement).reset();
    this.msgTimer = setTimeout(() => { this.formMsgVisible = false; }, 7000);
  }

  onImgError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
    const placeholder = img.nextElementSibling as HTMLElement;
    if (placeholder) placeholder.style.display = 'flex';
  }

  scrollToContact(): void {
    this.scrollToSection('contact');
  }

  scrollToSection(id: string): void {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  get doubledClients(): string[] {
    return [...this.clients, ...this.clients];
  }

  get waLink(): string {
    return 'https://wa.me/918980008332?text=Hello%20Scale%20Engineers%2C%20I%20would%20like%20to%20discuss%20a%20water%20infrastructure%20consultancy%20requirement%20for%20my%20project.';
  }
}
