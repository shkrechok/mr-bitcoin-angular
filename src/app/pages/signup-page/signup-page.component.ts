import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent {
        
    user: User ={
      name: '',
    } 
  
    constructor(private userService: UserService, private router: Router) { }
  
    onLogin() {
      this.userService.login(this.user.name)
        .subscribe(user => {
          this.router.navigateByUrl('/home')
        })
    }
}
