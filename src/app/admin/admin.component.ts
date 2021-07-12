import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { AuthenticationService } from '../_services/authentication.service';
@Component({ templateUrl: 'admin.component.html' })
export class AdminComponent implements OnInit {
    loading = false;
    users: User[] = [];
    currentUserName: string;

    constructor( private authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.loading = true;
        this.currentUserName = this.authenticationService.userValue.firstName + " " + this.authenticationService.userValue.lastName;
    }
}