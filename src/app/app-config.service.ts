import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAppSettings } from './models';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  private webConfigUrl = 'assets/web.config.json';

  config: IAppSettings = <IAppSettings>{};

  constructor(private httpClient: HttpClient) {}

  loadCofig() {
    return new Promise<boolean>((resolve, reject) => {
      this.httpClient
        .get<IAppSettings>(this.webConfigUrl)
        .toPromise()
        .then(
          (res) => {
            this.config = res;
            resolve(true);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  get randomClientId() {
    return Math.random().toString(36).substring(2).toUpperCase();
  }
}
