import { Component, OnDestroy, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { HeroService } from '../../services/hero.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [FormsModule, NgFor, HeroDetailComponent],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})

export class HeroesComponent implements OnInit, OnDestroy {
  
  constructor(private heroService: HeroService) {}
  
  heroes: Hero[] = [];
  selectedHero?: Hero;
  private heroesSubscription?: Subscription;
  
  ngOnInit(): void {
   this.heroesSubscription = this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  ngOnDestroy(): void {
    if(this.heroesSubscription){
      this.heroesSubscription?.unsubscribe()
    }
  }
}

