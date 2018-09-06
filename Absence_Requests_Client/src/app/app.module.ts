import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule } from '@angular/material'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';

import { AppComponent } from './app.component';
import { AbsencesComponent } from './absences/absences.component';
import { AppRoutingModule } from './/app-routing.module';
import { AbsenceRequestComponent } from './absence-request/absence-request.component';
import { AppReasonComponent } from './app-reason/app-reason.component';
import { AbsenceService } from './absence.service';

@NgModule({
  declarations: [
    AppComponent,
    AbsencesComponent,
    AbsenceRequestComponent,
    AppReasonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    CdkTableModule,
    CdkTreeModule
  ],
  providers: [
    AbsenceService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }