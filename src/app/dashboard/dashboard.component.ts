import {Component, OnInit} from '@angular/core';
import {Hero} from '../hero';
import {HeroService} from '../services/hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  selectedHero?: Hero;
  popupVisible: boolean = false;
  heroes: Hero[] = [];
  wantToAddNewHero: boolean = false;

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
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
    this.wantToAddNewHero = false;
    this.selectedHero = hero;
    this.popupVisible = true;
  }

  hidePopupHero(isDataChanged: boolean): void {
    this.popupVisible = false;
    if (isDataChanged) {
      this.getHeroes();
    }
  }
}
