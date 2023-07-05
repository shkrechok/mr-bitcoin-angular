import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import {
  Observable,
  BehaviorSubject,
  throwError,
  from,
  tap,
  retry,
  catchError,
  filter,
  switchMap
} from 'rxjs';
import { storageService } from './async-storage.service';
import { Contact } from '../models/contact.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ContactService } from './contact.service';
import { Subscription } from 'rxjs';

const USER_DB = 'contacts';
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser';

@Injectable({
  // important soo we could use this service in the root app, have access to it
  providedIn: 'root',
})
export class UserService {
  private _loggedInUser$ = new BehaviorSubject<User>({});
  public loggedInUser$ = this._loggedInUser$.asObservable() || null;

  
  constructor(
    private contactService: ContactService,
  ) {
    
    const loggedinUser = JSON.parse(
      sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || 'null'
    );
    if (loggedinUser) this._loggedInUser$.next(loggedinUser);
  }

  user = {
    name: 'Ochoa Hyde',
    coins: 100,
    moves: [],
  };
  //   private _loggedInUser$ = new BehaviorSubject(this.user)

  getLoggedInUser() {
    return this._loggedInUser$.value;
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
    this._loggedInUser$.next({ name: '' });
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

  transferFunds(contact: Contact, amount: number) {
    const loggedInUser = this.getLoggedInUser();
  
    this.contactService.getContactById(loggedInUser._id as string).pipe(
      switchMap((user) => {
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
  
        return this.contactService.saveContact(user);
      }),
      switchMap(() => {
        return this.contactService.getContactById(contact._id as string);
      }),
      switchMap((contact) => {
        if (!contact.coins) {
          contact.coins = 0;
        }
        contact.coins += amount;
        if (!contact.moves) {
          contact.moves = [];
        }
  
        contact.moves.push({
          _id: this.makeId(),
          fromId: loggedInUser._id as string,
          from: loggedInUser.name,
          at: Date.now(),
          amount,
        });
  
        return this.contactService.saveContact(contact);
      })
    ).subscribe({
        next: () => {
          console.log('Transfer complete');
        },
        error: (error) => {
            console.log('Transfer failed', error);
        }
      });
  }


}

