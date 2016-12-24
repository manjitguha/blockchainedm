import { Injectable } from '@angular/core';
import {Link} from './link';
import { LINKS } from './staticlinks';


@Injectable()
export class LinkService {
    getLinks(): Promise<Link[]> {
        return Promise.resolve(LINKS);
    }
    getLink(id: number): Promise<Link> {
        return this.getLinks()
            .then(links => links.find(link => link.id === id));
    }

}
