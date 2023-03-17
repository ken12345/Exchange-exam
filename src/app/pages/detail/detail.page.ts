import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PickerController, LoadingController} from '@ionic/angular';
import { UtilsService } from 'src/app/services/utils.service';
import { CurrencyService } from 'src/app/services/currency.service';
import { Labels } from 'src/app/app.constant';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})

export class DetailPage implements OnInit {

  code: string = "";

  label = Labels;

  compareCode: string = "";

  currencyList: any = [];

  rate: number = 0;

  startDate: string = "";

  endDate: string = "";
  
  tableList: any = [];

  rates = {
      "2019-01-01": {
        "USD": 1.146125
      },
      "2019-01-02": {
        "USD": 1.131753
      },
      "2019-01-03": {
        "USD": 1.139056
      },
      "2019-01-04": {
        "USD": 1.139556
      },
      "2019-01-05": {
        "USD": 1.139556
      }
  }
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private pickerCrtl: PickerController,
    private loading: LoadingController,
    private currencyService: CurrencyService,
    private utils: UtilsService
  ) { }

  ngOnInit() {
    this.initialize();
  }

  async initialize() {
    await this.showLoading();
    this.code = this.activatedRoute.snapshot.paramMap.get('code') || "";
    const list: any = await this.currencyService.getCurrencySymbol();
    this.currencyList = this.utils.composeList(list?.symbols);
     this.loading.dismiss();
  }

  back() {
    this.router.navigate(['/'])
  }

  async openList() {
    const picker = await this.pickerCrtl.create({
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
            this.compareCode = value.currency.value;
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

  async go() {
    await this.showLoading();
    const res: any = await this.currencyService.setLatestRateCode(this.code, this.compareCode);
    this.rate = res?.rates[`${this.compareCode}`];
    this.loading.dismiss();
  }

  async submit() {
    await this.showLoading();
    const res: any = await this.currencyService.getHistory(this.code, this.compareCode, this.startDate, this.endDate);
    this.tableList = await this.utils.composeGraph(res.rates, this.compareCode)
    this.loading.dismiss();
    console.log("kensh",res,  this.startDate, this.endDate)
  }

}
