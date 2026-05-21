import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { injectSpeedInsights } from '@vercel/speed-insights';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  private animFrameId: number = 0;

  ngOnInit(): void {
    // Initialize Vercel Speed Insights
    injectSpeedInsights();
  }

  ngAfterViewInit(): void {
    this.initWaterCanvas();
    this.initParticles();
  }

  ngOnDestroy(): void {
    if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
  }

  private initParticles(): void {
    const container = document.getElementById('particles');
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 20; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.cssText = `left:${Math.random()*100}%;animation-delay:${Math.random()*15}s;animation-duration:${12+Math.random()*8}s;width:${1+Math.random()*2}px;height:${1+Math.random()*2}px`;
      container.appendChild(p);
    }
  }

  private initWaterCanvas(): void {
    const canvas = document.getElementById('waterCanvas') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let w: number, h: number, t = 0;
    const resize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize, { passive: true });
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let y = 0; y < h; y += 64) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(14,165,233,${0.22 + 0.14 * Math.sin(y * 0.01 + t)})`;
        ctx.lineWidth = 0.5;
        for (let x = 0; x <= w; x += 4) {
          const wy = Math.sin(x * 0.014 + t + y * 0.007) * 18 + Math.sin(x * 0.007 - t * 0.7) * 10;
          x === 0 ? ctx.moveTo(x, y + wy) : ctx.lineTo(x, y + wy);
        }
        ctx.stroke();
      }
      t += 0.011;
      this.animFrameId = requestAnimationFrame(draw);
    };
    draw();
  }

  get waLink(): string {
    return 'https://wa.me/918980008332?text=Hello%20Scale%20Engineers%2C%20I%20would%20like%20to%20discuss%20a%20water%20infrastructure%20consultancy%20requirement%20for%20my%20project.%20Kindly%20guide%20me%20with%20further%20details.';
  }
}
