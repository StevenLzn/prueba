import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    providers: [UserService],
})

export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    title: string;
    status: string;
    identity;
    token;

    constructor(
        private formBuilder: FormBuilder,
        private _userService: UserService,
        private _router:Router,
    ) {
        this.title = "Identificate";
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    get f() { return this.loginForm.controls; }

    onSubmit() {
        this._userService.signup({ "username": this.f.username.value, "password": this.f.password.value }).subscribe(
            response => {
                localStorage.removeItem('token')
                localStorage.setItem('token', JSON.stringify(response));
                this._router.navigate(['/profile']);
            },
            error => {
                var errorMessage = <any>error;
                console.log(errorMessage);
                if (errorMessage != null) {
                    this.status = 'error';
                }
            }
        )
    }
}