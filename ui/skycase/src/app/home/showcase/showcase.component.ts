import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
    selector: 'app-showcase',
    templateUrl: './showcase.component.html',
    styleUrls: ['./showcase.component.css']
})
export class ShowcaseComponent {

    constructor( private router: Router) { }

}
