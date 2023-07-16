import { Injectable } from '@angular/core';
import { Move, User } from '../models/user.model';
import {
  Observable,
  BehaviorSubject,
  throwError,
  from,
  tap,
  retry,
  catchError,
  filter,
  switchMap,
  concatMap
} from 'rxjs';
import { storageService } from './async-storage.service';
import { Contact } from '../models/contact.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ContactService } from './contact.service';

const USER_DB = 'contacts';
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser';

@Injectable({
  // important soo we could use this service in the root app, have access to it
  providedIn: 'root',
})
export class UserService {
  private _loggedInUser$ = new BehaviorSubject<User>({}) || null;
  public loggedInUser$ = this._loggedInUser$.asObservable() || null;

  
  constructor(
    private contactService: ContactService,
  ) {
    
    let loggedinUser = JSON.parse(
      sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || 'null'
    ) as User || null;
    if (loggedinUser) this._loggedInUser$.next(loggedinUser);
  } 

  //   private _loggedInUser$ = new BehaviorSubject(this.user)

  getLoggedInUser() {
    return this._loggedInUser$.value ? this._loggedInUser$.value : null;
  }

  signup(name: any) {
    const newUser: User = { name: name, coins: 100, moves: [] };
    newUser._id = this.makeId();
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(newUser));
    this._loggedInUser$.next(newUser);
    return from(storageService.post(USER_DB, newUser as Contact)).pipe(
      tap((user) => {
        console.log('user:', user);
        return user;
      }),
      retry(1),
      catchError(this._handleError)
    );
  }

  login(name: any) {
    return from(storageService.query(USER_DB)).pipe(
      tap((users) => {
        const user = users.find((user) => user.name === name);
        if (!user) return this.signup(name);
        sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user));
        this._loggedInUser$.next(user);
        return user;
      }),
      retry(1),
      catchError(this._handleError)
    );
  }

  logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER);
    this._loggedInUser$.next(null as any);
  }

  makeId(length = 5) {
    var txt = '';
    var possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
      txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
  }
  private _handleError(err: HttpErrorResponse) {
    console.log('error in contact service:', err);
    return throwError(() => err);
  }

//  transferFunds(contact: Contact, amount: number) {
//     const loggedInUser = this.getLoggedInUser() as User;
//     console.log('logged user: ',loggedInUser,'contact: ', contact)
    
//     if (loggedInUser) {
//     this.contactService.getContactById(loggedInUser._id as string ).pipe(
//       concatMap((user) => {
//         if (!user.coins || user.coins < amount) {
//           throw new Error('Not enough coins');
//         }
  
//         user.coins -= amount;
//         if (!user.moves) {
//           user.moves = [];
//         }
  
//         user.moves.push({
//           _id: this.makeId(),
//           toId: contact._id as string,
//           to: contact.name as string,
//           at: Date.now(),
//           amount,
//         });
        
        
//        return this.contactService.saveContact(user);
        
//       }),
//       concatMap(() => {
//         return this.contactService.getContactById(contact._id as string);
//       }),
//       concatMap((contact) => {
//         if (!contact.coins) {
//           contact.coins = 0;
//         }
//         contact.coins += amount;
//         if (!contact.moves) {
//           contact.moves = [];
//         }
  
//         contact.moves.push({
//           _id: this.makeId(),
//           fromId: loggedInUser._id as string,
//           from: loggedInUser.name,
//           at: Date.now(),
//           amount,
//         });
        
//         return this.contactService.saveContact(contact);
//       })
//     ).subscribe({
//         next: (contact) => {
//             console.log('Transfer complete');
//             return contact;
            
//         },
//         error: (error) => {
//             console.log('Transfer failed', error);
//         }
//       });}
//   }
transferFunds(contact: Contact, amount: number): Observable<Contact> {
  const loggedInUser = this.getLoggedInUser() as User;

  if (loggedInUser) {
    return this.contactService.getContactById(loggedInUser._id as string).pipe(
      concatMap((user) => {
        if (!user.coins || user.coins < amount) {
          throw new Error('Not enough coins');
        }

        user.coins -= amount;
        if (!user.moves) {
          user.moves = [];
        }

        user.moves.push({
          _id: this.makeId(),
          toId: contact._id as string,
          to: contact.name as string,
          at: Date.now(),
          amount,
        });

        return this.contactService.saveContact(user).pipe(
          concatMap(() => {
            return this.contactService.getContactById(contact._id as string);
          }),
          concatMap((updatedContact) => {
            if (!updatedContact.coins) {
              updatedContact.coins = 0;
            }
            updatedContact.coins += amount;
            if (!updatedContact.moves) {
              updatedContact.moves = [];
            }

            updatedContact.moves.push({
              _id: this.makeId(),
              fromId: loggedInUser._id as string,
              from: loggedInUser.name,
              at: Date.now(),
              amount,
            });

            return this.contactService.saveContact(updatedContact);
          })
        );
      })
    );
  } else {
    console.log('User not logged in');
    return throwError('User not logged in');
  }
}









}

