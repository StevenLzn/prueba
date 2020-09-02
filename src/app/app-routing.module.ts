import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FiguresComponent } from './components/figures/figures.component';
import { GroupListComponent } from './components/group-list/group-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { CreateFigureComponent } from './components/create-figure/create-figure.component';
import { EditFigureComponent } from './components/edit-figure/edit-figure.component';


const routes: Routes = [
  {path : 'figures', component : FiguresComponent},
  {path : 'profile', component : ProfileComponent},
  {path : 'login', component : LoginComponent},
  {path : 'group-list', component : GroupListComponent},
  {path : 'new-figure', component : CreateFigureComponent},
  {path : 'edit-figure/:id', component : EditFigureComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
