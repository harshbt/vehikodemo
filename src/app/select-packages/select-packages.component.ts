import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, Event } from '@angular/router';
import { PowertrainService } from '../services/powertrain.service';
import { SelectColorService } from '../services/select-color.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { SelectPackageService } from "../services/select-package.service";

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
  isData: boolean = true;
  selectInterior : any;
  selectedinterior : any;
  modalRef?: BsModalRef;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private selectPackageService: SelectPackageService,
    private selectColorService: SelectColorService,
    private powertrainService: PowertrainService,
    private modalService: BsModalService) { 
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
          } else {
            this.router.navigate(['/404']);
          }
        }
      });
    }

    

  ngOnInit(): void {
    this.urlModelName = this.route.snapshot.params["urlModelName"];
    this.urlMakeName = this.route.snapshot.params["urlMakeName"];
    this.modelYear = this.route.snapshot.params["modelYear"];
    this.vehicleId = this.route.snapshot.params["vehicleId"];
    if (this.vehicleId) {
      this.getTrim();
      this.getPackages();
      this.getModelColors();
      this.getPowertrain();
      this.getInterior(); 
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
    this.selectPackageService.getTrimData(this.vehicleId,this.modelYear).subscribe((trim: any) => {
      if (trim.isSuccess) {
        this.trim = trim.data[0];
        this.totalPrice = this.trim.msrp;
      } else {
        this.isData = false;
      }
    });
  }

  getInterior(){
    this.selectPackageService.getInterior(this.vehicleId).subscribe((interior:any)=>{
      if(interior.isSuccess) {
        this.selectInterior = interior.data;
      }else{
        //do nothing
      }
    })
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

  selectColor(color, template: TemplateRef<any>) {
    if (color == this.selectedColor) {
      this.selectedColor = null;
      this.optionPrice -= this.selectedColor.msrp;
    } else {
      this.selectedColor = color;
      this.modalRef = this.modalService.show(template);
      this.optionPrice += this.selectedColor.msrp;
    }
  }

  selectedInterior(interior){
      if(interior == this.selectedinterior){
        this.selectedinterior = null;
      } else {
        this.selectedinterior = interior;
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

}
