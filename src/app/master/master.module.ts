import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MasterRoutingModule } from './master-routing,module';
import { UserListComponent } from './user/list/user-list.component';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './user/list/user-list.store';


@NgModule({
    imports: [
        SharedModule,
        MasterRoutingModule,
        StoreModule.forFeature("user", userReducer )
    ],
    declarations: [
        UserListComponent
    ]
})
export class MasterModule { }
