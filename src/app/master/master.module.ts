import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MasterRoutingModule } from './master-routing,module';
import { UserListComponent } from './user/user-list.component';

@NgModule({
    imports: [
        SharedModule,
        MasterRoutingModule
    ],
    declarations: [
        UserListComponent
    ]
})
export class MasterModule { }
