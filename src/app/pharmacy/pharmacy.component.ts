import { Component, OnInit } from '@angular/core';

import { User } from '../models/index';
import { UserService } from '../services/index';

@Component({
    templateUrl: 'pharmacy.component.html'
})

export class PharmacyComponent implements OnInit {
    constructor(private userService: UserService) { }

    ngOnInit() {
    }
}