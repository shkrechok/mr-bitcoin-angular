import { Location } from '@angular/common';
import {
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Observable,
  Subscription,
  catchError,
  lastValueFrom,
  map,
  switchMap,
  filter,
} from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { UserService } from 'src/app/services/user.service';
import { Move } from 'src/app/models/user.model';

@Component({
  selector: 'contact-details-page',
  templateUrl: './contact-details-page.component.html',
  styleUrls: ['./contact-details-page.component.scss'],
})
export class ContactDetailsPageComponent implements OnInit {
  constructor(
    private contactService: ContactService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  contact!: Contact;
  subscription!: Subscription;
  contact$!: Observable<Contact>;
  isTransfer: boolean = false;
  moves!: Move[];

  ngOnInit(): void {
    this.contact$ = this.route.data.pipe(
      map( data => data['contact'])
      
    )
    this.contact$.subscribe(contact => {
      this.contact = contact
      this.moves = this.contact.moves?.slice(-3) as Move[]
    }
    )
    
  }
  onBack() {
    this.router.navigateByUrl('/contact')
    
}
onToggleTransfer() {
  this.isTransfer = !this.isTransfer
}
closeTransfer() {
  this.isTransfer = false
}
 onTransferFunds(amount: number) {
  this.userService
    .transferFunds(this.contact, amount)

    this.isTransfer = false
  }
// ngOnDestroy(): void {
//   this.subscription?.unsubscribe()
// }
}

