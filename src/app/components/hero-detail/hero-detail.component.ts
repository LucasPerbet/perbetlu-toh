import { Component, Input, OnInit} from '@angular/core';
import { NgIf } from '@angular/common';
import { HeroInterface } from '../../data/heroInterface';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../../services/hero.service';




@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css'
})
export class HeroDetailComponent implements OnInit{
  
  hero: HeroInterface | undefined;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}
  
  ngOnInit(): void {
    this.getHero();
  }
  
  getHero(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }
}
