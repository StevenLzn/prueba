import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FiguresComponent } from './components/figures/figures.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { GroupListComponent } from './components/group-list/group-list.component';
import { CreateFigureComponent } from './components/create-figure/create-figure.component';
import { EditFigureComponent } from './components/edit-figure/edit-figure.component';

import { UserService } from './services/user.service';
import { FigureService } from './services/figure.service';



@NgModule({
  declarations: [
    AppComponent,
    FiguresComponent,
    ProfileComponent,
    LoginComponent,
    GroupListComponent,
    CreateFigureComponent,
    EditFigureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    UserService,
    FigureService],
  bootstrap: [AppComponent]
})
export class AppModule { }
