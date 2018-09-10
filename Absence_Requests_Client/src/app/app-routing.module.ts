import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AbsencesComponent } from './absences/absences.component';
import { AbsenceRequestComponent } from './absence-request/absence-request.component';
import { StarterComponent } from './starter/starter.component';

const routes: Routes = [
  { path: 'starter', component: StarterComponent },
  { path: 'absences', component: AbsencesComponent },
  { path: 'absence-request', component: AbsenceRequestComponent },
  { path: '', redirectTo: 'starter', pathMatch: 'full' },
  { path: '**', redirectTo: 'starter', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
