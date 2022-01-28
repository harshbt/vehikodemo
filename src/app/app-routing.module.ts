import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TrimComponent } from './components/trim/trim.component';
import { SelectPackagesComponent } from './components/select-packages/select-packages.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'trim/:urlMakeName/:urlModelName/:modelYear', component: TrimComponent },
  { path: 'trim/:urlMakeName/:urlModelName/:modelYear/:vehicleId', component: TrimComponent },
  { path: 'selectpackage/:urlMakeName/:urlModelName/:modelYear/:vehicleId', component: SelectPackagesComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
