
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WaitComponent } from './wait/wait.component';
import { ProgressComponent } from './progress/progress.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        WaitComponent,
        ProgressComponent
    ],
    declarations: [
        WaitComponent,
        ProgressComponent
    ]
})
export class SharedModule { }
