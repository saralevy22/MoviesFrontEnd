import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorizedcomponent';
import { AuthGuard } from './_services/auth.guard';
import { Role } from './_models/role';

const routes: Routes = [
    {
        path: 'not-authorized',
        component: NotAuthorizedComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'secure',
        component: AdminComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin],
         }
    },
    {
        path: 'login',
        component: LoginComponent
    },
    { path: '**', redirectTo: 'login' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
