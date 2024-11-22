import { Component, OnInit, inject } from '@angular/core';
import { HeroService } from '../../services/hero.service';
import { HeroInterface } from '../../data/heroInterface';
import { Hero } from '../../data/hero';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Location, NgIf } from '@angular/common';

@Component({
  selector: 'app-hero-editor',
  standalone: true,
  imports: [NgIf],
  templateUrl: './hero-editor.component.html',
  styleUrl: './hero-editor.component.css'
})
export class HeroEditorComponent implements OnInit {


  hero: HeroInterface | undefined;
  heroesAsync?: Observable<Hero[]>;
  private heroService: HeroService = inject(HeroService);

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  addHero() {
    this.heroService.addHero();
  }
}
