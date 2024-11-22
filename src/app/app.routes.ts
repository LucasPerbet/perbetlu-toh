import { Routes } from '@angular/router';
import { HeroesComponent } from './components/heroes/heroes.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { HeroEditorComponent } from './components/hero-editor/hero-editor.component';
import { WeaponComponent } from './components/weapon/weapon.component';

export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent},
    { path: 'heroes', component: HeroesComponent },
    { path:'detail/:id', component: HeroDetailComponent },
    { path:'weapon', component: WeaponComponent },
    { path:'hero-editor', component: HeroEditorComponent }
];
