import { Component } from '@angular/core';
import { Hero } from '../../interfaces/hero';
import { HEROES } from '../../data/mock-heroes';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})
export class HeroesComponent {
  heroes = HEROES;
}
