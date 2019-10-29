import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
    selector: 'app-progress',
    templateUrl: 'progress.component.html'
})

export class ProgressComponent implements OnInit {
    cvalue = 0;
    _interval$: any;
    constructor(

    ) { }

    ngOnInit() {
        this._interval$ = interval(250).subscribe(
            e => {
                this.cvalue++;
                if (this.cvalue == 100)
                    this.cvalue = 0;
            }
        )
    }

    ngOnDestroy() {
        this._interval$.unsubscribe();
    }


}