import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Customer, Service } from '../customer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [Service]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  customers: Customer[] = [];

  constructor(
    private heroService: HeroService,
    private service: Service
  ) {
    this.customers = service.getCustomers();
  }

  ngOnInit(): void {
    //this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }
}
