import { PopupDataService } from './../services/popup-data.service';
import {Component, OnInit} from '@angular/core';
import {HeroService} from "../services/hero.service";
import {MessageService} from "../services/message.service";
import {Hero} from "../hero";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(
    private heroService: HeroService,
    private _popupService: PopupDataService,
    private messageService: MessageService
  ) {}

  ngOnChanges() {
    this.getHeroes();
  }

  ngOnInit() {
    this._popupService.needToReload$.subscribe(
      needToReload => {
        if (needToReload) this.getHeroes();
      }
    );
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroes = [];
    this.heroService.getHeroes().subscribe(heroes => {
      heroes.forEach(hero => {
        this.heroes.unshift(hero);
      })
    });
  }

  getHeroLatestId(): number {
    return this.heroes[0].id + 1;
  }

  deleteHero(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }

  showPopupToInsert(): void {
    const blankHero = {
      id: this.getHeroLatestId(),
      name: ''
    };
    this._popupService.bindHeroInfo(blankHero);
    this._popupService.setPopupType(false);
    this._popupService.setPopupVisible(true);
  }
}
