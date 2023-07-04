import { inject } from "@angular/core";
import { ActivatedRouteSnapshot } from "@angular/router";
import { delay } from "rxjs";
import { ContactService } from "../services/contact.service";

export function contactResolver(route: ActivatedRouteSnapshot) {
    const contactId = route.params['id']
    const contactService = inject(ContactService)
    return contactService.getContactById(contactId).pipe(delay(100))
}