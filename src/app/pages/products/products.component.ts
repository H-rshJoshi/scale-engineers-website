import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  applications: string[];
  image: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html'
})
export class ProductsComponent implements AfterViewInit, OnDestroy {
  private observer?: IntersectionObserver;

  products: Product[] = [
    {
      id: 'agitator',
      name: 'Agitator & Mixer',
      tagline: 'Precision blending for uniform treatment',
      description: 'High-efficiency agitators and mixers designed for uniform blending of chemicals, suspension of solids, and gas dispersion in water and wastewater treatment plants. Built with corrosion-resistant materials and engineered for low energy consumption with maximum mixing performance.',
      applications: ['Coagulation Tanks', 'Flash Mixers', 'Chemical Dosing', 'Sludge Tanks'],
      image: 'product-agitator-mixer.jpg'
    },
    {
      id: 'clarifier',
      name: 'Clarifier',
      tagline: 'Settling solutions for clean water output',
      description: 'Robust clarifiers designed for efficient sedimentation and separation of suspended solids from raw and treated water. Available in circular and rectangular configurations, with options for primary, secondary, and tertiary treatment stages — engineered for low maintenance and high throughput.',
      applications: ['Water Treatment Plants', 'Sewage Treatment', 'Industrial Effluent', 'Pre-treatment'],
      image: 'product-clarifier.jpg'
    },
    {
      id: 'clariflocculator',
      name: 'Clariflocculator',
      tagline: 'Combined flocculation & clarification in one unit',
      description: 'A compact two-in-one system that combines flocculation and clarification, reducing footprint and capital cost. Ideal for large-scale municipal WTPs, our clariflocculators feature a central flocculation zone surrounded by a peripheral settling zone — proven in plants up to 170 MLD capacity.',
      applications: ['Municipal WTP', 'Drinking Water', 'Surface Water Treatment', 'Pre-treatment for RO'],
      image: 'product-clariflocculator.jpg'
    },
    {
      id: 'detritor',
      name: 'Detritor',
      tagline: 'Grit & sand removal at the source',
      description: 'A specialised grit removal unit designed to separate sand, gravel, and other heavy inorganic particles from raw sewage. Protects downstream equipment from abrasion and reduces sludge volume in primary clarifiers. Engineered for continuous operation with minimal manual intervention.',
      applications: ['Sewage Treatment Plants', 'Pre-treatment', 'Pumping Stations', 'Storm Water'],
      image: 'product-detritor.jpg'
    },
    {
      id: 'surface-aerator',
      name: 'Surface Aerator',
      tagline: 'Powerful oxygen transfer for biological treatment',
      description: 'High-efficiency surface aerators designed for biological wastewater treatment, providing optimal oxygen transfer and mixing in aeration basins. Available in fixed and floating configurations, suitable for both municipal STPs and industrial effluent applications under SBR and conventional processes.',
      applications: ['Aeration Basins', 'SBR Plants', 'Lagoons', 'Industrial ETP'],
      image: 'product-surface-aerator.jpg'
    },
    {
      id: 'thickener',
      name: 'Thickener',
      tagline: 'Concentrated sludge for efficient dewatering',
      description: 'Gravity thickeners engineered for concentrating sludge before dewatering, reducing the load on downstream filter presses and centrifuges. Designed for continuous duty with picket-fence type rakes, our thickeners deliver consistent underflow density and clear overflow water.',
      applications: ['Sludge Treatment', 'WTP Sludge Concentration', 'STP Pre-dewatering', 'Industrial Effluent'],
      image: 'product-thickener.jpg'
    }
  ];

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const siblings = Array.from(e.target.parentElement?.children || []);
          const delay = Math.min(siblings.indexOf(e.target as Element) * 80, 480);
          setTimeout(() => e.target.classList.add('visible'), delay);
        }
      });
    }, { threshold: 0.06, rootMargin: '0px 0px -30px 0px' });
    setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => this.observer?.observe(el));
    }, 0);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  onImgError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
    const placeholder = img.nextElementSibling as HTMLElement;
    if (placeholder) placeholder.style.display = 'flex';
  }
}
