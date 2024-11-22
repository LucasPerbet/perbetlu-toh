import { NgFor, AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Hero } from '../../data/hero';
import { HeroService } from '../../services/hero.service';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, RouterLink,AsyncPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  hero?: Hero;
  heroesAsync?: Observable<Hero[]>;
  private heroService: HeroService = inject(HeroService);

  constructor(){}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroesAsync = this.heroService.getHeroes();
    this.heroesAsync
  }
}