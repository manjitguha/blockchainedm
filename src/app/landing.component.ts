import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import {Link} from './link';
import {LinkService} from './link.service';

@Component({
    selector: 'landing-root',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.css']
})

export class LandingComponent implements OnInit {
    title = 'app works!';
    links: Link[];
    selectedLink: Link;
    constructor(private linkService: LinkService) { }
    getLinks(): void {
        this.linkService.getLinks().then(links => this.links = links);
    }
    ngOnInit(): void {
        this.getLinks();
    }
    onSelect(link: Link): void {
        this.selectedLink = link;
    }
}
