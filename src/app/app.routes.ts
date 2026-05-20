import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ProductsComponent } from './pages/products/products.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Scale Engineers | WTP STP ETP Consultancy Ahmedabad' },
  { path: 'projects', component: ProjectsComponent, title: 'Projects | Scale Engineers — WTP STP Portfolio India' },
  { path: 'products', component: ProductsComponent, title: 'Products | Scale Engineers — Water Treatment Equipment' },
  { path: '**', redirectTo: '' }
];
