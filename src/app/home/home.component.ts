import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousinglocationComponent } from '../housinglocation/housinglocation.component';
import { Housinglocation } from '../housinglocation';
import { HousingService } from '../housing.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousinglocationComponent],
  template: `
  <section>
    <form>
      <input type="text" placeholder="Filter by city" #filter>
      <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
    </form>
  </section>
  <section class="results">
    <app-housing-location *ngFor="let housingLocation of filteredLocationList" [housingLocation]="housingLocation"></app-housing-location>
  </section>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  readonly baseUrl = 'https://angular.io/assets/images/tutorials/faa';

    housingLocationList: Housinglocation[] = [];
    housingService:HousingService=inject(HousingService)
    filteredLocationList:Housinglocation[] = []

    constructor(){
      this.housingService.getAllHousingLocations().then((house:Housinglocation[])=>{
        this.housingLocationList = house;
        this.filteredLocationList = house
      })
    }
    filterResults(text:string){
      if(!text){
        this.filteredLocationList = this.housingLocationList
      }
      this.filteredLocationList = this.housingLocationList.filter(house=> house.city.toLowerCase().includes(text.toLowerCase()))
    }
}
