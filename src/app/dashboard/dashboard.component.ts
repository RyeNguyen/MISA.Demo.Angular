import {Component, OnInit} from '@angular/core';
import {Hero} from '../hero';
import {HeroService} from '../services/hero.service';
import { PopupDataService } from '../services/popup-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(
    private heroService: HeroService,
    private _popupService: PopupDataService) {}

  ngOnInit(): void {
    this._popupService.needToReload$.subscribe(
      needToReload => {
        if (needToReload) this.getHeroes();
      }
    );
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService
      .getHeroes()
      .subscribe(heroes => {
          heroes.forEach(hero => {
            this.heroes.unshift(hero);
          });
          this.heroes = this.heroes.slice(0, 4);
        }
      );
  }

  onHeroReorder(e: any): void {
    const heroList = this.heroes.splice(e.fromIndex, 1)[0];
    this.heroes.splice(e.toIndex, 0, heroList);
  }

  showPopup(hero: Hero): void {
    this._popupService.bindHeroInfo(hero);
    this._popupService.setPopupType(false);
    this._popupService.setPopupVisible(true);
  }
}
