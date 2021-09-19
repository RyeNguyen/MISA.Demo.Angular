import { Component } from '@angular/core';
import { Hero } from './hero';
import { PopupDataService } from './services/popup-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Tour of Heroes';
  selectedHero?: Hero;
  popupVisible: boolean = false;
  wantToAddNewHero: boolean = false;

  constructor(private _popupService: PopupDataService) {

  }

  ngOnInit() {
    this._popupService.selectedHero$.subscribe(
      heroInfo => {
        this.selectedHero = heroInfo;
      }
    );

    this._popupService.popupVisible$.subscribe(
      visible => {
        this.popupVisible = visible;
      }
    );

    this._popupService.wantToAddNewHero$.subscribe(
      wantToAddNewHero => {
        this.wantToAddNewHero = wantToAddNewHero;
      }
    )
  }

  hidePopupHero(isDataChanged: boolean): void {
    this.popupVisible = false;
    if (isDataChanged) {
      this._popupService.setReloadStatus(true);
    } else {
      this._popupService.setReloadStatus(false);
    }
  }
}
