import { Component, OnInit } from '@angular/core';

import { User } from '../models/index';
import { UserService } from '../services/index';

@Component({
    templateUrl: 'payer.component.html'
})

export class PayerComponent implements OnInit {
    constructor(private userService: UserService) { }

    ngOnInit() {
    }
}