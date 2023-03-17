import { Component, OnInit } from '@angular/core';
import { PickerController, LoadingController} from '@ionic/angular';

import { CurrencyService } from 'src/app/services/currency.service';
import { UtilsService } from 'src/app/services/utils.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Labels } from 'src/app/app.constant';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  label = Labels;

  currencyList: any = null;

  baseCode: string = "";

  favoriteList: any = [];

  rateList: any = [
    // {curr: "AUD", rate: 40.50},
    // {curr: "USD", rate: 40.50},
    // {curr: "PHP", rate: 40.50},
    // {curr: "JPY", rate: 40.50},
    // {curr: "EUR", rate: 40.50},
    // {curr: "ALL", rate: 40.50},
    // {curr: "EUR", rate: 40.50},
    // {curr: "EUR", rate: 40.50},
    // {curr: "EUR", rate: 40.50},
    // {curr: "EUR", rate: 40.50},
    // {curr: "EUR", rate: 40.50},
    // {curr: "EUR", rate: 40.50},
    // {curr: "EUR", rate: 40.50},
    // {curr: "EUR", rate: 40.50},
    // {curr: "EUR", rate: 40.50},
    // {curr: "EUR", rate: 40.50},
  ];

  constructor(
    private currencyService: CurrencyService,
    private pickerCtrl: PickerController,
    private utils: UtilsService,
    private storage: LocalStorageService,
    private loading: LoadingController
  ) { }

  ngOnInit() {
    this.initialize();
  }

  async initialize() {
    await this.showLoading();
    this.getLocalData();
    const list: any = await this.currencyService.getCurrencySymbol();
    this.currencyList = this.utils.composeList(list?.symbols);
     this.loading.dismiss();
  }

  async getLocalData() {
    const store = await this.storage.get("favorite");
    if(store === "" || store === null || typeof store === "undefined") {
      return;
    }
    this.favoriteList =  store?.split(",");
  }

  async openList() {
    const picker = await this.pickerCtrl.create({
      columns: [
        {
          name: 'currency',
          options: this.currencyList
        }
      ],
      buttons: [
        {
          text: Labels.CANCEL,
          role: 'cancel',
        },
        {
          text: Labels.CONFIRM,
          handler: (value) => {
            this.baseCode = value.currency.value;
          },
        },
      ],
    });
    await picker.present();
  }

  async showLoading() {
    const loading = await this.loading.create({
      message: 'Loading...',
      spinner: 'circles',
    });

    loading.present();
  }

  async removeHandler(data: string) {
    const index = this.favoriteList.findIndex((el: string) => el === data);
    this.favoriteList.splice(index, 1);
    this.storage.set("favorite", this.favoriteList);
  }

  async go() {
    await this.showLoading();
    const res: any = await this.currencyService.setLatestRateCode(this.baseCode);
    console.log("kensh res", res)
    this.loading.dismiss();
    this.rateList = this.utils.composeRateList(res?.rates);
  }

  async favoriteEvent(name: string) {
    const existing = this.favoriteList.some((el: string) => el === name);
    if(existing) {
      return
    }
    // limit to 4 faves
    if(this.favoriteList.length >= 4) {
      this.favoriteList.splice(0, 1);
    }
    this.favoriteList.push(name);
    await this.storage.set("favorite", this.favoriteList);
  }

}
