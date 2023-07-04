import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, filter, map, switchMap } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'contact-edit-page',
  templateUrl: './contact-edit-page.component.html',
  styleUrls: ['./contact-edit-page.component.scss']
})
export class ContactEditPageComponent implements OnInit {
  
  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
  ) { }

  router = inject(Router)

  contact = this.contactService.getEmptyContact() as Contact;
  subscription!: Subscription;

  ngOnInit(): void {
    if (this.route.data) {
          this.route.data.pipe(
      map(data => data['contact']),
      filter(contact => !!contact),
    ).subscribe(contact => {
      this.contact = contact
    })
  }
  }
  
  onSaveContact() {
    this.subscription = this.contactService.saveContact(this.contact).subscribe({
      next: () => this.router.navigateByUrl('/contact'),
      error: err => {
        console.log('err:', err)
      }
    })
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }
}


