import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {}

  public async set(key: string, value: any) {
    const val = value.toString();
    await Preferences.set({
      key: key,
      value: val,
    });
  }

  public async get(key: string,) {
    const { value } = await Preferences.get({ key: key });
    return value;
  }
}
