import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, Event } from '@angular/router';
import { PowertrainService } from '../../services/powertrain.service';
import { SelectColorService } from '../../services/select-color.service';

import { SelectPackageService } from "../../services/select-package.service";

@Component({
  selector: 'app-select-packages',
  templateUrl: './select-packages.component.html',
  styleUrls: ['./select-packages.component.css']
})
export class SelectPackagesComponent implements OnInit {
  urlModelName: string;
  urlMakeName: string;
  modelYear: number;
  vehicleId: number;
  packages: any;
  showSelected: any;
  selectedPackage = [];
  selectedPackageInfo: any;
  trim: any;
  totalPrice: number;
  optionPrice: number = 0;
  modelColors: any;
  selectedColor: any;
  powertrains: any;
  selectedPowertrain = [];
  showPowertrainInfo: any;
  powertrainInfo: any;
  optionRules: any;
  requiredOptions: any;
  interiors: any;
  selectedInterior: any;
  isData: boolean = true;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private selectPackageService: SelectPackageService,
    private selectColorService: SelectColorService,
    private powertrainService: PowertrainService) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.urlModelName = this.route.snapshot.params["urlModelName"];
        this.urlMakeName = this.route.snapshot.params["urlMakeName"];
        this.modelYear = this.route.snapshot.params["modelYear"];
        this.vehicleId = this.route.snapshot.params["vehicleId"];
        if (this.vehicleId) {
          this.getTrim();
          this.getPackages();
          this.getModelColors();
          this.getPowertrain();
          this.getInterirors();
        } else {
          this.router.navigate(['/404']);
        }
      }
    });
  }

  ngOnInit(): void {
    debugger
    this.urlModelName = this.route.snapshot.params["urlModelName"];
    this.urlMakeName = this.route.snapshot.params["urlMakeName"];
    this.modelYear = this.route.snapshot.params["modelYear"];
    this.vehicleId = this.route.snapshot.params["vehicleId"];
    if (this.vehicleId) {
      this.getTrim();
      this.getPackages();
      this.getModelColors();
      this.getPowertrain();
      this.getInterirors();
    } else {
      this.router.navigate(['/404']);
    }
  }

  getPackages() {
    this.selectPackageService.getPackages(this.vehicleId).subscribe((packageList: any) => {
      if (packageList.isSuccess) {
        this.packages = packageList.data;
      } else {
        //no data found
      }
    });
  }

  getTrim() {
    this.selectPackageService.getTrimData(this.vehicleId, this.modelYear).subscribe((trim: any) => {
      if (trim.isSuccess) {
        this.trim = trim.data[0];
        this.totalPrice = this.trim.msrp;
      } else {
        this.isData = false;
      }
    });
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

  getInterirors() {
    this.selectPackageService.getInterior(this.vehicleId).subscribe((interior: any) => {
      if (interior.isSuccess) {
        this.interiors = interior.data;
      } else {
        // do nothing
      }
    })
  }

  getPackageInfo(packageData) {
    this.selectPackageService.getInfo(packageData.vehicleId, packageData.optionCode).subscribe((info: any) => {
      if (info.isSuccess) {
        this.selectedPackageInfo = info.data;
        this.showSelected = packageData;
      } else {
        //do nothing
      }
    });
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

  getPowertrainRules(optionId) {
    this.selectPackageService.getPowertrainRule(this.vehicleId, optionId).subscribe((rules: any) => {
      if (rules.isSuccess) {
        this.optionRules = rules.data;
        this.optionRules.map((rule: any) => {
          if (rule.ruleType == 'Requires') {

          }
        })
        document.getElementById("openModalButton").click();
      }
    })
  }

  showMoreInfo(packageData) {
    if (packageData == this.showSelected) {
      this.showSelected = null;
    } else {
      this.getPackageInfo(packageData);
    }
  }

  selectPackage(packageData, i) {
    if (true == this.selectedPackage[i]) {
      this.selectedPackage[i] = false;
      this.optionPrice -= packageData.msrp;
    } else {
      this.selectedPackage[i] = true;
      this.optionPrice += packageData.msrp;
    }
  }

  selectColor(color) {
    // document.getElementById("openModalButton").click();
    if (color == this.selectedColor) {
      this.selectedColor = null;
      this.optionPrice -= this.selectedColor?.msrp || 0;
    } else {
      this.selectedColor = color;
      this.optionPrice += this.selectedColor?.msrp || 0;
      this.getPowertrainRules(this.selectedColor.optionId);
    }
  }

  selectPowertrain(powertrain, i) {
    if (true == this.selectedPowertrain[i]) {
      this.selectedPowertrain[i] = false;
      this.optionPrice -= powertrain.msrp;
    } else {
      this.selectedPowertrain[i] = true;
      this.optionPrice += powertrain.msrp;
    }
  }

  showPowertrain(powertrain) {
    if (powertrain == this.showPowertrainInfo) {
      this.showPowertrainInfo = null;
    } else {
      this.getPowertrainInfo(powertrain);
    }
  }

  selectInterior(interior) {
    if (interior == this.selectedInterior) {
      this.selectedInterior = null;
      this.optionPrice -= this.selectedInterior?.msrp || 0;
    } else {
      this.selectedInterior = interior;
      this.optionPrice += this.selectedInterior?.msrp || 0;
      this.getPowertrainRules(this.selectedInterior.optionId);
    }
  }

}
