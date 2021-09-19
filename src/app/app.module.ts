import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {HttpClientModule} from '@angular/common/http';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './services/in-memory-data.service';
import {AppComponent} from './app.component';
import {HeroesComponent} from "./heroes/heroes.component";
import {PopupComponent} from './popup/popup.component';
import {FormsModule} from "@angular/forms";
import {HeroDetailComponent} from "./hero-detail/hero-detail.component";
import {MessagesComponent} from "./messages/messages.component";
import {AppRoutingModule} from './app-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HeroSearchComponent} from './hero-search/hero-search.component';

import {
  DxButtonModule,
  DxDropDownButtonModule,
  DxDataGridModule,
  DxPopupModule,
  DxTextBoxModule,
  DxScrollViewModule,
  DxSortableModule
} from 'devextreme-angular';
import { HeroGridComponent } from './hero-grid/hero-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent,
    PopupComponent,
    HeroGridComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {dataEncapsulation: false}
    ),
    DxButtonModule,
    DxDropDownButtonModule,
    DxDataGridModule,
    DxPopupModule,
    DxTextBoxModule,
    DxScrollViewModule,
    DxSortableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
