import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FigureService } from '../../services/figure.service';

@Component({
    selector: 'edit-figure',
    templateUrl: './edit-figure.component.html'
})

export class EditFigureComponent implements OnInit {
    title = 'Editar figura'
    status;
    dataGroups;
    createFigureForm: FormGroup;
    positionsWinner = [];
    id;
    dataFigure;

    constructor(
        private formBuilder: FormBuilder,
        private _figureService: FigureService,
        private _router: Router,
        private _route: ActivatedRoute,
    ) {
        this.positionsWinner = [false, false, false, false, false,
            false, false, false, false, false,
            false, false, false, false, false,
            false, false, false, false, false,
            false, false, false, false, false];
        this.id = this._route.snapshot.paramMap.get("id")
    }

    ngOnInit() {
        this.getGroups();
        this.getFigureById();
        this.createFigureForm = this.formBuilder.group({
            figureName: ['', Validators.required],
            idFigureGroup: ['', Validators.required],
            positions: ['', Validators.required],
        });
    }

    get f() { return this.createFigureForm.controls; }

    onSubmit() {
        this._figureService.editFigure({ "figureName": this.f.figureName.value, "idFigureGroup": this.f.idFigureGroup.value, "positions": this.positionsWinner }, this.id).subscribe(
            response => {
                this._router.navigate(['/figures']);
            },
            error => {
                var errorMessage = <any>error;
                console.log(errorMessage);
                if (errorMessage != null) {
                    this.status = 'error';
                }
                if (errorMessage.status == 401) {
                    this._router.navigate(['/login']);
                }
            }
        )
    }

    onClickCell(i) {
        this.positionsWinner[i] = !this.positionsWinner[i];
    }

    getGroups() {
        this._figureService.getGroups().subscribe(
            response => {
                this.dataGroups = response.data;
            },
            error => {
                var errorMessage = <any>error;
                console.log(errorMessage);
                if (errorMessage != null) {
                    this.status = 'error';
                }
                if (errorMessage.status == 401) {
                    this._router.navigate(['/login']);
                }
            }
        )
    }

    getFigureById() {
        this._figureService.getFigureById(this.id).subscribe(
            response => {
                this.dataFigure = response.data;
                this.createFigureForm.patchValue({
                    figureName: this.dataFigure.name,
                    idFigureGroup: this.dataFigure.groupFigureId.id
                });
                this.positionsWinner = this.dataFigure.positionsWinner;
            },
            error => {
                var errorMessage = <any>error;
                console.log(errorMessage);
                if (errorMessage != null) {
                    this.status = 'error';
                }
                if (errorMessage.status == 401) {
                    this._router.navigate(['/login']);
                }
            }
        )
    }
}