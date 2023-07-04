import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs'
import { Subject, debounceTime, distinctUntilChanged, pipe, takeUntil } from 'rxjs';
import { ContactFilter } from 'src/app/models/contact.filter';
import { Contact } from 'src/app/models/contact.model'
import { ContactService } from 'src/app/services/contact.service'


@Component({
  selector: 'contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent implements OnInit {

  constructor(private contactService: ContactService) { }
  contacts: Contact[] | null = null
  contactFilter: ContactFilter = { term: '', filterBy: 'name' }
  contacts$!: Observable<Contact[]>
  subscription!: Subscription
  destroySubject$ = new Subject()
    filterSubject$ = new Subject()

  async ngOnInit(): Promise<void> {
    this.contacts$ = this.contactService.contacts$
    console.log('this.contacts$', this.contacts$)
    
    if (this.contactFilter){
    this.contactService.contactFilter$.pipe(
      takeUntil(this.destroySubject$)
    ).subscribe(contactFilter => {
      this.contactFilter = contactFilter
    }
    )
    this.filterSubject$.pipe(
      takeUntil(this.destroySubject$),
      debounceTime(400),
      distinctUntilChanged(),
    ).subscribe(() => {
       this.contactService.setContactFilter(this.contactFilter)
    })
  }
  }

  onDeleteContact(contactId: string) {
    this.contactService.deleteContact(contactId).subscribe({
      error: err => {
        console.log('err:', err)
      }
    })
  }
  onSetFilter(value: string) {
    this.filterSubject$.next(value)
}
  

}
