import { Component, OnDestroy, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero';
import { HEROES } from '../../data/mock-heroes';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';


@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [FormsModule, NgFor, HeroDetailComponent],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})

export class HeroesComponent implements OnInit, OnDestroy {
  
  heroes = HEROES;
  selectedHero?: Hero;

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  ngOnInit(): void {
    
  }
  ngOnDestroy(): void {
    
  }

}

