import { Component, OnInit } from '@angular/core';

import { User } from '../models/index';
import { UserService } from '../services/index';

@Component({
    templateUrl: 'noaccess.component.html'
})

export class NoAccessComponent implements OnInit {
    constructor(private userService: UserService) { }

    ngOnInit() {
    }
}