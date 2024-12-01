import { Routes } from '@angular/router';
import { HeroesComponent } from './components/heroes/heroes.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { HeroEditorComponent } from './components/hero-editor/hero-editor.component';
import { WeaponComponent } from './components/weapon/weapon.component';
import { WeaponEditorComponent } from './components/weapon-editor/weapon-editor.component';
import { GlobalEditorComponent } from './components/global-editor/global-editor.component';

export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent},
    { path: 'heroes', component: HeroesComponent },
    { path:'detail/:id', component: HeroDetailComponent },
    { path:'weapon', component: WeaponComponent },
    { path:'hero-editor', component: HeroEditorComponent },
    { path:'hero-editor/:id', component: HeroEditorComponent },
    { path:'weapon-editor', component: WeaponEditorComponent },
    { path:'weapon-editor/:id', component: WeaponEditorComponent },
    { path:'global-editor', component: GlobalEditorComponent },
];
