import { Component, OnInit } from '@angular/core';

import { User } from '../models/index';
import { UserService } from '../services/index';

@Component({
    templateUrl: 'pharmacy.component.html'
})

export class PharmacyComponent implements OnInit {
	model: any = {};
    loading = false;
    error = '';

    constructor(private userService: UserService) { }

    ngOnInit() {
    	this.model.currentUser = JSON.parse(localStorage.getItem('currentUser')).userDetails;
    }
}