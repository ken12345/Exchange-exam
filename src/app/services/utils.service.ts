import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private env = environment;

  constructor(
    private http: HttpClient
  ) { }

  private getHeader(){
    return {
      'apikey' : this.env.apiKey,
    };
  }

  public async invokeGetService( endpoint: string, queryParam: string = "") {
    const query = queryParam !== "" ? `?${queryParam}` : "";
    return await this.http.get(`${this.env.apiURL}${endpoint}${query}`, { headers: this.getHeader() }).toPromise();
  }

  public composeList(obj: any) {
    let list: any[] = [];
    const entries = Object.entries(obj);
    entries.map( ([key, val]) => {
      list.push({value: key, text: `${val} (${key})`})
    });
    return list;
  }

  public composeRateList(obj: any) {
    let list: any[] = [];
    const entries = Object.entries(obj);
    entries.map( ([key, val]) => {
      list.push({rate: val, curr: key});
    });
    return list;
  }

  public async composeGraph(obj: any, code: string) {
    let list: any[] = [];
    let finalList: any = [];
    const entries = Object.entries(obj);
    entries.map( ([key, val]) => {
      list.push({rate: val, date: key});
    });

    list.map((el: any) => {
      const entry = Object.values(el.rate);
      finalList.push({date: el.date, rate: entry[0]});
    })
    return finalList
  }

}
