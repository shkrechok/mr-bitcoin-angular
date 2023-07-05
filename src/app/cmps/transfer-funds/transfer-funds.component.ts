import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'transfer-funds',
  templateUrl: './transfer-funds.component.html',
  styleUrls: ['./transfer-funds.component.scss']
})
export class TransferFundsComponent {
  @Input() contact: any;
  @Output() transferFunds = new EventEmitter<any>();
  @Output() closeTransfer = new EventEmitter<any>();

  amount: number = 0;

  onTransferFunds() {
    this.transferFunds.emit(this.amount);
  }
  
  onCloseTransfer() {
    this.closeTransfer.emit();
  }

  
}
