import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, map, of, switchMap, timer } from 'rxjs';
import { storageService } from './storage.service';
@Injectable({
  providedIn: 'root',
})
export class BitcoinService {
  TRADE_VOLUME_KEY = 'tradeVolume';
  BIT_COIN_RATE_KEY = 'bitCoinRate';
  AVG_BLOCK_SIZE_KEY = 'avgBlockSize';
  MARKET_PRICE_KEY = 'marketPrice';

  constructor(private http: HttpClient) {}

  getRate(coins = 1) {
    const data = storageService.load(this.BIT_COIN_RATE_KEY);
    if (data) return of(data);
    return this.http.get<string>(
      `https://blockchain.info/tobtc?currency=USD&value=${coins}`
    ).pipe(
        map((res) => {
            storageService.store(this.BIT_COIN_RATE_KEY, res);
            return res;
            }
        )
    );
  }

  getTradeVolume() {
    const data = storageService.load(this.TRADE_VOLUME_KEY);
    // console.log('data service', data);

    if (data) return of(data);
    return this.http
      .get<{ values: [{ x: any; y: any }] }>(
        `https://api.blockchain.info/charts/trade-volume?timespan=5months&format=json&cors=true`
      )
      .pipe(
        map((res) => {
          //prepare the data in a way that the chart can render
          const vals = res.values.map((item) => {
            return {
              name: new Date(item.x * 1000).toLocaleDateString('en-US'),
              value: item.y,
            };
          });
          storageService.store(this.TRADE_VOLUME_KEY, vals);
          return vals;
        })
      );
  }

  getAvgBlockSize() {
    const data = storageService.load(this.AVG_BLOCK_SIZE_KEY);
    // console.log('data service', data);
    if (data) return of(data);
    return this.http
      .get<{ values: [{ x: any; y: any }] }>(
        `https://api.blockchain.info/charts/avg-block-size?timespan=5months&format=json&cors=true`
      )
      .pipe(
        map((res) => {
          //prepare the data in a way that the chart can render
          const vals = res.values.map((item) => {
            return {
              name: new Date(item.x * 1000).toLocaleDateString('en-US'),
              value: item.y,
            };
          });
          storageService.store(this.AVG_BLOCK_SIZE_KEY, vals);
          return vals;
        })
      );
  }

  getMarketPrice() {
    const data = storageService.load(this.MARKET_PRICE_KEY);
    // console.log('data service', data);
    if (data) return of(data);
    return this.http

      .get<{ values: [{ x: any; y: any }] }>(
        `https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true`
      )
      .pipe(
        map((res) => {
          //prepare the data in a way that the chart can render
          const vals = res.values.map((item) => {
            return {
              name: new Date(item.x * 1000).toLocaleDateString('en-US'),
              value: item.y,
            };
          });
          storageService.store(this.MARKET_PRICE_KEY, vals);
          return vals;
        })
      );
  }
}
