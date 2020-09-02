import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FigureService } from '../../services/figure.service'

@Component({
    selector: 'figures',
    templateUrl: './figures.component.html'
})

export class FiguresComponent implements OnInit {
    title = 'Figures Component'
    status;
    dataFigures;
    dataGroups;

    constructor(
        private _figureService: FigureService,
        private _router:Router,
    ) {
    }

    ngOnInit() {
        this.getFigures();
    }

    getFigures() {
        this._figureService.getFigures().subscribe(
            response => {
                this.dataFigures = response.data;
            },
            error =>{
                var errorMessage = <any>error;
                console.log(errorMessage);
                if (errorMessage != null) {
                    this.status = 'error';
                }
                if(errorMessage.status == 401){
                    this._router.navigate(['/login']);
                }
            }
        )
    }

    onClickRemove(j){
        this.dataFigures.splice(j, 1)
    }

    getGroups() {
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
                if(errorMessage.status == 401){
                    this._router.navigate(['/login']);
                }
            }
        )
    }
}