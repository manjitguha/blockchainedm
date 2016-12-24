import { Component, OnInit } from '@angular/core';

import { User } from '../models/index';
import { UserService } from '../services/index';

@Component({
    templateUrl: 'lab.component.html'
})

export class LabComponent implements OnInit {
    constructor(private userService: UserService) { }

    ngOnInit() {
    }
}