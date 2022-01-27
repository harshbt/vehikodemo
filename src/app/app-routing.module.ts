import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TrimComponent } from './trim/trim.component';
import { PowertrainComponent } from './powertrain/powertrain.component';
// import { SelectColorComponent } from './select-color/select-color.component';
import { SelectPackagesComponent } from './select-packages/select-packages.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'trim/:urlMakeName/:urlModelName/:modelYear', component: TrimComponent },
  { path: 'trim/:urlMakeName/:urlModelName/:modelYear/:vehicleId', component: TrimComponent },
  { path: 'powertrain/:urlMakeName/:urlModelName/:modelYear/:vehicleId', component: PowertrainComponent },
  // { path: 'selectcolor/:urlMakeName/:urlModelName/:modelYear/:vehicleId/:powertrain', component: SelectColorComponent },
  { path: 'selectpackage/:urlMakeName/:urlModelName/:modelYear/:vehicleId', component: SelectPackagesComponent },
  {path: '404', component:NotFoundComponent},
  {path: '**',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
