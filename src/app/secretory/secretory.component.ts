import { Component, OnInit } from '@angular/core';

import { User } from '../models/index';
import { UserService } from '../services/index';

@Component({
    templateUrl: 'secretory.component.html'
})

export class SecretoryComponent implements OnInit {
    constructor(private userService: UserService) { }

    ngOnInit() {
    }
}