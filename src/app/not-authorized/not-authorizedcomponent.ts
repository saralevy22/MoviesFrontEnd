import { Component } from '@angular/core';
import { User } from '../_models/user';
import { AuthenticationService } from '../_services/authentication.service';
@Component({ templateUrl: 'not-authorized.component.html' })
export class NotAuthorizedComponent {
    loading = false;
    user: User;
    userFromApi: User;

    constructor(
        private authenticationService: AuthenticationService
    ) {
        this.user = this.authenticationService.userValue;
    }

    ngOnInit() {
        this.loading = true;
    }
}