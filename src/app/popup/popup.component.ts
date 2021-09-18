import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Hero} from "../hero";
import {HeroService} from '../hero.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  @Input() selectedHero: Hero;
  @Input() popupVisible: boolean;
  @Input() wantToAddNewHero: boolean;

  @Output() onPopupHidden: EventEmitter<any> = new EventEmitter();

  newHeroInfo: Hero;
  heroIdAsText: string;

  constructor(private heroService: HeroService) {
  }

  ngOnInit(): void {
    this.getHero();
    this.heroIdAsText = this.selectedHero.id.toString();
    this.newHeroInfo = JSON.parse(JSON.stringify(this.selectedHero));
  }

  getHero(): void {
    // const heroId = this.hero.id;
    // this.heroService.getHero(heroId).subscribe(hero => this.hero = hero);
  }

  changeHeroInfo(data: any): void {
    this.newHeroInfo.name = data.value;
  }

  saveData(): void {
    if (this.wantToAddNewHero) {
      this.addHero();
    } else {
      this.updateHero();
    }
  }

  addHero(): void {
    const heroName = this.newHeroInfo.name.trim();
    if (!heroName) {
      return;
    }
    this.heroService.addHero(this.newHeroInfo)
      .subscribe(() => this.hidePopup());
  }

  updateHero(): void {
    if (this.isDataChanged()) {
      this.heroService.updateHero(this.newHeroInfo)
        .subscribe(() => this.hidePopup());
    } else {
      this.hidePopup();
    }
  }

  isDataChanged(): boolean {
    for (let prop in this.newHeroInfo) {
      // @ts-ignore
      if (this.newHeroInfo[prop] != null) {
        // @ts-ignore
        if (this.newHeroInfo[prop].toString().length === 0) {
          // @ts-ignore
          if (this.newHeroInfo[prop]) {
            return true;
          }
        } else { // @ts-ignore
          if (this.newHeroInfo[prop] !== this.selectedHero[prop]) {
            return true;
          }
        }
      }
    }
    return false;
  }

  hidePopup(): void {
    const isDataChanged = this.isDataChanged();
    this.onPopupHidden.emit(isDataChanged);
  }
}
