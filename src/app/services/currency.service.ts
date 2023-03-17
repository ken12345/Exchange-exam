import { Injectable } from '@angular/core';
import { Endpoint } from '../app.constant';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private symbols: any = null;

  private latestList: any = [];

  constructor(
    private utils: UtilsService
  ) { }

  public async setLatestRateCode(baseCode: string, compareTo: string = "") {
    const result: any = await this.utils.invokeGetService(Endpoint.LATEST, `symbols=${compareTo}&base=${baseCode}`);
    this.latestList = result?.rates;
    return result;
  }

  getLatestRateCode() {
    return this.latestList;
  }


  public async getCurrencySymbol() {
    if(this.symbols !== null) {
      return this.symbols;
    }
    const result = await this.utils.invokeGetService(Endpoint.EXCHANGE_RATES_DATA );
    this.symbols = result;
    return result;
  }

  public async getHistory(baseCode: string= "", compareTo: string = "", from: string, to: string) {
    const result: any = await this.utils.invokeGetService(Endpoint.HISTORY, `symbols=${compareTo}&base=${baseCode}&start_date=${from}&end_date=${to}`);
    this.latestList = result?.rates;
    return result;
  }


}
