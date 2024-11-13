import { Component, Input} from '@angular/core';
import { NgIf } from '@angular/common';
import { Hero } from '../../interfaces/hero';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css'
})
export class HeroDetailComponent{
  
  @Input() hero?: Hero;
}
