import { Component, OnInit } from '@angular/core';

import { User } from '../models/index';
import { UserService } from '../services/index';

@Component({
    templateUrl: 'secretory.component.html'
})

export class SecretoryComponent implements OnInit {
    private currentUser: User;
    constructor(private userService: UserService) { }

    ngOnInit() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        alert(this.currentUser);
    }
}