import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Hero } from '../hero';

@Injectable({
  providedIn: 'root'
})

export class PopupDataService {
  private _selectedHeroSource = new Subject<Hero>();
  private _popupVisibleSource = new Subject<boolean>();
  private _wantToAddNewHeroSource = new Subject<boolean>();
  private _needToReloadSource = new Subject<boolean>();

  selectedHero$ = this._selectedHeroSource.asObservable();
  popupVisible$ = this._popupVisibleSource.asObservable();
  wantToAddNewHero$ = this._wantToAddNewHeroSource.asObservable();
  needToReload$ = this._needToReloadSource.asObservable();

  constructor() { }

  setPopupVisible(visible: boolean) {
    this._popupVisibleSource.next(visible);
  }

  setPopupType(wantToAddNewHero: boolean) {
    this._wantToAddNewHeroSource.next(wantToAddNewHero);
  }

  setReloadStatus(needToReload: boolean) {
    this._needToReloadSource.next(needToReload);
  }

  bindHeroInfo(heroInfo: Hero) {
    this._selectedHeroSource.next(heroInfo);
  }
}
