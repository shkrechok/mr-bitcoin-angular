import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { take } from 'rxjs/operators';
import { BitcoinService } from '../services/bitcoin.service.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements  OnInit{
  constructor(
    private contactService: ContactService
    ,private BitcoinService: BitcoinService,
    private userService: UserService,
    private router: Router
    ) {}
  bitCoinRate: number = 0;
  loggedInUser: User | null = null;
  nameToDisplay: string = 'Guest';

   ngOnInit(): void {
    this.contactService.loadContacts().pipe(take(1)).subscribe({
        error: err => {
            console.log('err:', err)
        }
    })
    this.BitcoinService.getRate().subscribe({
      next: rate => {
        this.bitCoinRate = +rate
      }
    })

    // this.loggedInUser = this.userService.getLoggedInUser() as User | null
    // if (this.loggedInUser){
    //   this.nameToDisplay = this.loggedInUser.name as string
    // }
    this.userService.loggedInUser$.subscribe({
      next: user => {
        if (user && user.name){
        this.loggedInUser = user
        this.nameToDisplay = user.name as string
        }else {
          this.nameToDisplay = 'Guest'
          this.router.navigateByUrl('/signup')
        }
      }
    })
    
}

   onLogout() {
    this.userService.logout()
    this.loggedInUser = null
    this.router.navigateByUrl('/signup')
   }
}
