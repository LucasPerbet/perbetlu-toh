import { Component, OnDestroy, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { HeroService } from '../../services/hero.service';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [FormsModule, NgFor, RouterLink],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})

export class HeroesComponent implements OnInit, OnDestroy {
  
  constructor(private heroService: HeroService) {}
  
  heroes: Hero[] = [];
  private heroesSubscription?: Subscription;
  
  ngOnInit(): void {
   this.heroesSubscription = this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  ngOnDestroy(): void {
    if(this.heroesSubscription){
      this.heroesSubscription?.unsubscribe()
    }
  }
}

