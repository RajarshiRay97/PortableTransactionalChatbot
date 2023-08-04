import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocatorComponent } from './components/locator/locator.component';
import { RealEstateManagementComponent } from './components/real-estate-management/real-estate-management.component';
import { ValueTrackComponent } from './components/value-track/value-track.component';

const routes: Routes = [
  {path: '', component: LocatorComponent},
  {path: 'value-track', component: ValueTrackComponent},
  {path: 'real-estate-management', component: RealEstateManagementComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
