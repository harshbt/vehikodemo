import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PowertrainService } from '../services/powertrain.service';

@Component({
  selector: 'app-powertrain',
  templateUrl: './powertrain.component.html',
  styleUrls: ['./powertrain.component.css']
})
export class PowertrainComponent implements OnInit {
  urlModelName: string;
  urlMakeName: string;
  modelYear: number;
  vehicleId: number;
  trim: any;
  powertrains: any;
  selectedPowertrain = [];
  showPowertrainInfo: any;
  powertrainInfo: any;
  optionId: any;
  optionPrice: number = 0;
  totalPrice: number;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private powertrainService: PowertrainService) {
    this.trim = JSON.parse(localStorage.getItem('trim'));
    this.totalPrice = this.trim.msrp;
  }

  ngOnInit(): void {
    this.urlModelName = this.route.snapshot.params["urlModelName"];
    this.urlMakeName = this.route.snapshot.params["urlMakeName"];
    this.modelYear = this.route.snapshot.params["modelYear"];
    this.vehicleId = this.route.snapshot.params["vehicleId"];
    this.getPowertrain();
    if (sessionStorage.getItem('selected')) {
      this.selectedPowertrain = JSON.parse(sessionStorage.getItem('selected'))
    }
  }

  getPowertrain() {
    this.powertrainService.getOptions(this.vehicleId).subscribe((options: any) => {
      console.log(options);
      if (options.isSuccess) {
        this.powertrains = options.data;
      } else {
        //do nothing
      }
    })
  }

  selectPowertrain(powertrain, i) {
    if (true == this.selectedPowertrain[i]) {
      this.selectedPowertrain[i] = false;
      this.optionPrice -= powertrain.msrp;
    } else {
      this.selectedPowertrain[i] = true;
      this.optionPrice += powertrain.msrp;
    }
    sessionStorage.setItem('selected', JSON.stringify(this.selectedPowertrain));
  }

  showPowertrain(powertrain) {
    if (powertrain == this.showPowertrainInfo) {
      this.showPowertrainInfo = null;
    } else {
      this.getPowertrainInfo(powertrain);
    }
  }

  getPowertrainInfo(powertrain) {
    this.powertrainService.getInfo(powertrain.vehicleId, powertrain.optionCode).subscribe((info: any) => {
      if (info.isSuccess) {
        this.powertrainInfo = info.data;
        this.showPowertrainInfo = powertrain;
      } else {
        //do nothing
      }
    });
  }

  color() {
    let ids = [];
    this.selectedPowertrain.map(data => {
      if (data != null) {
        ids.push(data?.optionId);
      }
    });
    this.optionId = ids.join(',');
    console.log(this.optionId);
    this.totalPrice += this.optionPrice;
    localStorage.setItem('totalPrice', JSON.stringify(this.totalPrice));
    localStorage.setItem('powertrain', JSON.stringify(this.selectedPowertrain));
    this.router.navigate(['/selectcolor', this.urlMakeName, this.urlModelName, this.modelYear, this.vehicleId, this.optionId]);
  }

}
