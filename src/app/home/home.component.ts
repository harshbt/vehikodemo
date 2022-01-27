import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { MakeModalService } from '../services/make-modal.service';
import { Make } from '../models/make';
import { Model } from '../models/model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  makes: Make[];
  models: Model[];
  modelId: number;
  makeId: number;
  zipCode: number;
  selectedMake: any;
  selectedModel: any;

  makeModelForm = this.fb.group({
    makeId: [''],
    modelId: [''],
    zipCode: ['']
  });

  slideConfig = {
    "dots": false,
    "infinite": true,
    "speed": 1000,
    "slidesToShow": 6,
    "slidesToScroll": 6,
    "prevArrow": document.getElementsByClassName('prev'),
    "nextArrow": document.getElementsByClassName('next'),
    "responsive": [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
      
    ]
  };

  constructor(
    private router: Router,
    private makeModalService: MakeModalService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getAllMakes();
  }

  //get makes list
  getAllMakes() {
    this.makeModalService.getMakeList().subscribe((makeList: any) => {
      if (makeList.isSuccess) {
        this.makes = <Make[]>makeList.data.sort((make1,make2) => make1.makeName.localeCompare(make2.makeName));
      } else {
        //do nothing
      }
    })
  }

  //get all models list on basis of selected make
  getModels(event: any) {
    this.makeModelForm.get('modelId')?.setValue('');
    this.makeId = event.target.value;
    this.makeModalService.getModelList(event.target.value).subscribe((modelList: any) => {
      if (modelList.isSuccess) {
        this.models = <Model[]>modelList.data.sort((model1,model2) => model1.modelName.localeCompare(model2.modelName));
      }
    })
  }

  //submit selected make, model and entered zipcode
  onSubmit() {
    if (this.makeModelForm.valid) {
      this.modelId = this.makeModelForm.get('modelId')?.value;
      this.zipCode = this.makeModelForm.get('zipCode')?.value;
      this.selectedMake = this.makes.filter(make => make.makeId == this.makeId);
      this.selectedModel = this.models.filter(model => model.modelId == this.modelId);
      this.router.navigate(['/trim',this.selectedMake[0].urlMakeName,this.selectedModel[0].urlModelName,this.selectedModel[0].modelYear,'']);
    }
  }
}
 