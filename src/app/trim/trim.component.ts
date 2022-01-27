import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, Event } from '@angular/router';

import { TrimService } from '../services/trim.service';

@Component({
  selector: 'app-trim',
  templateUrl: './trim.component.html',
  styleUrls: ['./trim.component.css']
})
export class TrimComponent implements OnInit {
  urlModelName: string;
  urlMakeName: string;
  modelYear: number;
  modelYears: number[];
  trims: any;
  selectedTrimData: any;
  vehicleId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private trimService: TrimService
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.urlModelName = this.route.snapshot.params["urlModelName"];
        this.urlMakeName = this.route.snapshot.params["urlMakeName"];
        this.modelYear = this.route.snapshot.params["modelYear"];
        if (this.urlModelName && this.modelYear) {
          this.getTrims();
          this.getModelYears();
        }
      }
    });
  }

  ngOnInit(): void {
    this.urlModelName = this.route.snapshot.params["urlModelName"];
    this.urlMakeName = this.route.snapshot.params["urlMakeName"];
    this.modelYear = this.route.snapshot.params["modelYear"];
    this.vehicleId = this.route.snapshot.params["vehicleId"];
    if (this.urlModelName && this.modelYear) {
      this.getTrims();
      this.getModelYears();
    }
  }

  //get trim list on basis of model name
  getTrims() {
    this.trimService.getTrim(this.urlModelName, this.modelYear).subscribe((trim: any) => {
      if (trim.isSuccess) {
        this.trims = trim.data;
        if (this.vehicleId) {
          this.selectedTrimData = this.trims.filter(data => data.vehicleId == this.vehicleId)[0];
          if(!(this.selectedTrimData && this.selectedTrimData.modelYear ==this.modelYear)){
            this.router.navigate(['/404']);
          }
        } else {
          this.selectedTrimData = this.trims[0];
        }
      }else{
        this.router.navigate(['/404']);
      }
    });
  }

  //get model years
  getModelYears() {
    this.trimService.getModelYears().subscribe((years: any) => {
      this.modelYears = years;
    })
  }

  selectTrim(trim) {
    this.selectedTrimData = trim;
    this.vehicleId = trim.vehicleId;
    this.router.navigate(['/trim', this.urlMakeName, this.urlModelName, trim.modelYear, this.vehicleId]);
    window.scroll(0, 0);
  }

  buildAndPrice() {
    sessionStorage.setItem('trim', JSON.stringify(this.selectedTrimData));
    this.router.navigate(['/selectpackage', this.urlMakeName, this.urlModelName, this.selectedTrimData.modelYear, this.selectedTrimData.vehicleId]);
  }

  selectYear(year) {
    this.modelYear = year;
    this.vehicleId =null;
    this.router.navigate(['/trim', this.urlMakeName, this.urlModelName, year]);
    this.getTrims();
  }

}
