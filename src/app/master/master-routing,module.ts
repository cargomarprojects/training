import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user/user-list.component';

const routes: Routes = [
    { path: 'userlist', component: UserListComponent },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [

    ],
    declarations: [],
})
export class MasterRoutingModule { }