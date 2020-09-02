import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html'
})

export class ProfileComponent implements OnInit {
    title = 'Profile Component'
    status;
    dataProfile;

    constructor(
        private _userService: UserService,
        private _router:Router,
    ) {
    }

    ngOnInit() {
        this.getProfile();
    }

    getProfile() {
        this._userService.getProfile().subscribe(
            response => {
                this.dataProfile = response.data;
            },
            error =>{
                var errorMessage = <any>error;
                console.log(errorMessage);
                if (errorMessage != null) {
                    this.status = 'error';
                }
                if(errorMessage.status == 401){
                    this._router.navigate(['/login']);
                }
            }
        )
    }
}