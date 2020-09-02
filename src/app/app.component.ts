import { Component } from '@angular/core';
import { UserService } from './services/user.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'bingo';
  token;

  constructor(
    private _userService : UserService,
  ){}

  ngDoCheck(){
    this.token = this._userService.getToken();
  }
}
