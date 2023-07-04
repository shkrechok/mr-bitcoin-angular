import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BitcoinService } from 'src/app/services/bitcoin.service.service';

interface Trade {
  name: string
  value: number
}
@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  trades$!: Observable<Trade>
  subscription!: Subscription

  constructor(private bitcoinService: BitcoinService) { }

  async ngOnInit(): Promise<void> {
      this.trades$ = this.bitcoinService.getTradeVolume()
}
}
