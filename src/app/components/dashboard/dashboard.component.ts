import { NgFor } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeroInterface } from '../../data/heroInterface';
import { HeroService } from '../../services/hero.service';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy {

  heroes: HeroInterface[] = [];
  private heroesSubscription?: Subscription;

  constructor(private heroService: HeroService){}


  
  ngOnInit(): void {
   this.heroesSubscription = this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes.slice(0,5));
  }


  ngOnDestroy(): void {
    if(this.heroesSubscription){
      this.heroesSubscription?.unsubscribe()
    }
  }
}
