import { Component, inject, OnInit } from '@angular/core';
import { Weapon } from '../../data/weapon';
import { WeaponService } from '../../services/weapon.service';
import { Observable } from 'rxjs';
import { NgFor, AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-weapon',
  standalone: true,
  imports: [NgFor, AsyncPipe],
  templateUrl: './weapon.component.html',
  styleUrl: './weapon.component.css'
})
export class WeaponComponent implements OnInit {

  weapon?: Weapon;
  weaponsAsync?: Observable<Weapon[]>;
  private weaponService: WeaponService = inject(WeaponService);

  ngOnInit(): void {
    this.getWeapons();
  }

  getWeapons(): void {
    this.weaponsAsync = this.weaponService.getWeapons();
  }
}
