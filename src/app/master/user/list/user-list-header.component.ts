import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
    selector: 'app-user-list-header',
    templateUrl: 'user-list-header.component.html'
})

export class UserListHeaderComponent implements OnInit {

    @Input() searchString
    @Output() searchClick = new EventEmitter<string>();


    constructor() { }

    ngOnInit() { }

    search(){

        if ( this.searchString === null )
            this.searchString = '';
        
        this.searchClick.emit(this.searchString);

    }
}