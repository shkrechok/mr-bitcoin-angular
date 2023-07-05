import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {
        
    user: User = {
      name: '',
      coins: 100,
      moves: []
    }
    constructor(private userService: UserService, private router: Router) { }
  
   ngOnInit(): void {
      this.userService.loggedInUser$.subscribe({
        next: user => {
          if (user)
            this.router.navigateByUrl('/home')
        }
      })
   }

    onLogin() {
      this.userService.login(this.user.name)
        .subscribe(user => {
          this.user = user as User
          this.router.navigateByUrl('/home')
        })
    }
}
