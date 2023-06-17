import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MoviesComponent } from './components/movies/movies.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PipesModule } from './pipes/pipes.module';
import { AppFilterPipe } from './pipes/filter';
import { MovieCardDialogComponent } from './components/movie-card-dialog/movie-card-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MoviesComponent,
    MovieCardComponent,
    MovieCardDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatDialogModule,
    PipesModule,
    FormsModule,
  ],
  providers: [AppFilterPipe],
  bootstrap: [AppComponent],
  entryComponents: [MovieCardDialogComponent]
})
export class AppModule { }
