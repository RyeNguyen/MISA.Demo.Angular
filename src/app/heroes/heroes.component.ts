/**
 * Author: NQMinh (9/15/2021)
 */

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
  selectedHero?: Hero;
  popupVisible: boolean = false;
  heroes: Hero[] = [];
  wantToAddNewHero: boolean = false;

  constructor(
    private heroService: HeroService,
    private messageService: MessageService
  ) {}

  ngOnChanges() {
    this.getHeroes();
  }

  ngOnInit() {
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

  /**
   * Delete hero
   * @param hero
   */
  deleteHero(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }

  showPopupToEdit(hero: Hero): void {
    this.wantToAddNewHero = false;
    this.selectedHero = hero;
    this.popupVisible = true;
  }

  showPopupToInsert(): void {
    this.wantToAddNewHero = true;
    this.selectedHero = {
      id: this.getHeroLatestId(),
      name: ''
    };
    this.popupVisible = true;
  }

  /**
   * Set the popup's status to Close
   */
  hidePopupHero(isDataChanged: boolean): void {
    this.popupVisible = false;
    if (isDataChanged) {
      this.getHeroes();
    }
  }
}
