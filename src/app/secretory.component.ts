import { Component } from '@angular/core';
import { OnInit } from '@angular/core';


@Component({
    selector: 'secretory-root',
    templateUrl: './secretory.component.html',
    styleUrls: ['./secretory.component.css']
})

export class SecretoryComponent implements OnInit {
    title = 'app works!';
    constructor() { }
    ngOnInit(): void {
    }
}
