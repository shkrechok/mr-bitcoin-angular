import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { take } from 'rxjs/operators';
import { BitcoinService } from '../../services/bitcoin.service.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { Observable, switchMap, Subscription } from 'rxjs';

@Component({
  selector: 'home',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {
  constructor(
    private contactService: ContactService
    ,private BitcoinService: BitcoinService,
    private userService: UserService,
    private router: Router
    ) {}
  bitCoinRate: number = 0;
  // loggedInUser$: Observable<User> = this.userService.loggedInUser$;
  loggedInUser!: User ;
  subscription!: Subscription;

   ngOnInit(): void {
    
    this.BitcoinService.getRate().subscribe({
      next: rate => {
        this.bitCoinRate = +rate
      }
    })
    this.userService.loggedInUser$.subscribe({
      next: user => {
        this.loggedInUser = user
      }
    })
   this.contactService.getContactById(this.loggedInUser._id as string).subscribe({
      next: user => {
        this.loggedInUser = user
      }
    })

    
}
  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }
   
}


