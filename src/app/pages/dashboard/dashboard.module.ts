import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { FavoriteChipComponent } from 'src/app/components/favorite-chip/favorite-chip.component';
import { RateListComponent } from 'src/app/components/rate-list/rate-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule
  ],
  declarations: [
    DashboardPage,
    FavoriteChipComponent,
    RateListComponent
  ]
})
export class DashboardPageModule {}
