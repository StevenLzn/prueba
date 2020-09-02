import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FigureService } from '../../services/figure.service';

@Component({
    selector: 'new-figure',
    templateUrl: './create-figure.component.html'
})

export class CreateFigureComponent implements OnInit {
    title = 'Creación de figura'
    status;
    dataGroups;
    createFigureForm: FormGroup;
    positionsWinner = [];

    constructor(
        private formBuilder: FormBuilder,
        private _figureService: FigureService,
        private _router:Router,
    ) {
        this.positionsWinner = [false, false, false, false, false, 
            false, false, false, false, false,
            false, false, false, false, false,
            false, false, false, false, false,
            false, false, false, false, false]
    }

    ngOnInit() {
        this.getGroups();
        this.createFigureForm = this.formBuilder.group({
            figureName: ['', Validators.required],
            idFigureGroup: ['', Validators.required],
            positions: ['', Validators.required],
        });
    }

    get f() { return this.createFigureForm.controls; }

    onSubmit() {
        this._figureService.createFigure({ "figureName": this.f.figureName.value, "idFigureGroup": this.f.idFigureGroup.value, "positions": this.positionsWinner }).subscribe(
            response => {
                this._router.navigate(['/figures']);
            },
            error => {
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

    onClickCell(i){
            this.positionsWinner[i] = !this.positionsWinner[i];                 
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