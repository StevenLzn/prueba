import { Component, OnInit } from '@angular/core';
import { FigureService } from '../../services/figure.service'

@Component({
    selector: 'group-list',
    templateUrl: './group-list.component.html'
})

export class GroupListComponent implements OnInit {
    title = 'Group Component'
    status;
    dataGroups;

    constructor(
        private _figureService: FigureService,
    ) {
    }

    ngOnInit() {
        this.getFigures();
    }

    getFigures() {
        this._figureService.getGroups().subscribe(
            response => {
                this.dataGroups = response.data;
            },
            error =>{
                var errorMessage = <any>error;
                console.log(errorMessage);
                if (errorMessage != null) {
                    this.status = 'error';
                }
            }
        )
    }
}