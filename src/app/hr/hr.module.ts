import { NgModule } from '@angular/core';
import { EmpComponent } from './emp/emp.component';
import { HrRoutingModule } from './hr-routing.module';


@NgModule({
    imports: [
        HrRoutingModule
    ],
    declarations: [
        EmpComponent
    ]
})
export class HrModule { }
