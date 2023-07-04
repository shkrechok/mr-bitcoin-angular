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
} from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'contact-details-page',
  templateUrl: './contact-details-page.component.html',
  styleUrls: ['./contact-details-page.component.scss'],
})
export class ContactDetailsPageComponent implements OnInit, OnDestroy {
  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  contact!: Contact;
  subscription!: Subscription;
  contact$!: Observable<Contact>;

  ngOnInit(): void {
    this.contact$ = this.route.data.pipe(
      map( data => data['contact']),
    );
  }
  onBack() {
    this.router.navigateByUrl('/contact')
    
}
ngOnDestroy(): void {
  this.subscription?.unsubscribe()
}
}
