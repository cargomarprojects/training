import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MasterRoutingModule } from './master-routing,module';
import { UserListComponent } from './user/list/user-list.component';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './user/list/user-list.store';
import { EffectsModule } from '@ngrx/effects';
import { UserListEffect } from './user/list/user-list.effects';
import { UserListHeaderComponent } from './user/list/user-list-header.component';


@NgModule({
    imports: [
        SharedModule,
        MasterRoutingModule,
        StoreModule.forFeature("userlist", userReducer ),
        EffectsModule.forFeature([UserListEffect]),
    ],
    declarations: [
        UserListComponent,
        UserListHeaderComponent
    ]
})
export class MasterModule { }
