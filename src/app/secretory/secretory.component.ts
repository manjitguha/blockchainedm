import { Component, OnInit } from '@angular/core';

import { User } from '../models/index';
import { UserService } from '../services/index';

@Component({
    templateUrl: 'secretory.component.html',
    styleUrls: ['secretory.component.css']
})

export class SecretoryComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';
    constructor(private userService: UserService) { }

    ngOnInit() {
        this.model.currentUser = JSON.parse(localStorage.getItem('currentUser')).userDetails;
    }

    createpatient() {
        this.loading = true;
        this.error = 'Username or password is incorrect';
        this.model.currentUser.firstName = 'Hello';
        alert(this.error);
        this.loading = false;
    }
}