import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SelectColorService } from '../../services/select-color.service';

@Component({
  selector: 'app-select-color',
  templateUrl: './select-color.component.html',
  styleUrls: ['./select-color.component.css']
})
export class SelectColorComponent implements OnInit {
  modelName: string;
  modelYear: number;
  optionIds = [];
  trim: any;
  urlModelName: string;
  urlMakeName: string;
  vehicleId: number;
  modelColors: any;
  selectedColor: any;
  totalPrice: number;
  optionPrice: number = 0;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private selectColorService: SelectColorService) {
    this.trim = JSON.parse(localStorage.getItem('trim'));
    this.totalPrice = JSON.parse(localStorage.getItem('totalPrice'));
  }

  ngOnInit(): void {
    this.urlModelName = this.route.snapshot.params["urlModelName"];
    this.urlMakeName = this.route.snapshot.params["urlMakeName"];
    this.modelYear = this.route.snapshot.params["modelYear"];
    this.vehicleId = this.route.snapshot.params["vehicleId"];
    this.optionIds = this.route.snapshot.params["powertrain"];
    this.getModelColors();
  }

  getModelColors() {
    this.selectColorService.getColors(this.vehicleId).subscribe((colors: any) => {
      if (colors.isSuccess) {
        this.modelColors = colors.data;
      } else {
        //no color found
      }
    });
  }

  selectColor(color) {
    this.selectedColor = color;
    this.optionPrice = this.selectedColor.msrp;
  }

  selectPackage(){
    this.totalPrice += this.optionPrice;
    localStorage.setItem('totalPrice', JSON.stringify(this.totalPrice));
    this.router.navigate(['/selectpackage',this.urlMakeName,this.urlModelName,this.modelYear,this.vehicleId,this.optionIds,this.selectedColor.optionId]);
  }

}
