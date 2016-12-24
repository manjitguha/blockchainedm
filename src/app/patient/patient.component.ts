import { Component, OnInit } from '@angular/core';

import { User } from '../models/index';
import { UserService } from '../services/index';

@Component({
    templateUrl: 'patient.component.html'
})

export class PatientComponent implements OnInit {
    constructor(private userService: UserService) { }

    ngOnInit() {
    }
}