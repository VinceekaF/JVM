import { Component, OnInit } from '@angular/core';
import { AbsenceService } from '../absence.service';
import { Absence } from '../absence';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, from} from 'rxjs';

@Component({
  selector: 'app-absences',
  templateUrl: './absences.component.html',
  styleUrls: ['./absences.component.css']
})
export class AbsencesComponent implements OnInit {

  choiceForm: FormGroup;
  filterByReasonForm: FormGroup;
  absences: Absence[];
  choices: string[] = ['Order by Nothing','Order by Emission date','Order by Start Date'];
  reasons: string[] = ['PaidVacation','RTT','SickChild','LeaveFamilyEvents'];
  reasonTemp: string = 'Order by Nothing';
  choiceTemp: string = 'Filter-';

  constructor(private absenceService: AbsenceService, private fb: FormBuilder) { }
  
// Créer un lien entre l'ordonnancement' et le filtrage


  ngOnInit() {
    this.choiceForm = this.fb.group({
      choiceControl: ['Order by Nothing']});
    this.filterByReasonForm = this.fb.group({
      filterByReasonControl: ['Filter -']});
    this.getAbsences();
  }
  
  onChange(event):void {
    const choiceVal = event.target.value;
    if(choiceVal == 'Order by Nothing'){
      this.getAbsences();
    }
    else if(choiceVal == 'Order by Emission date'){
      this.sortByEmissionDate();
    }    
    else if(choiceVal == 'Order by Start Date'){
      this.sortByStartDate();
    }

  }
  
  filterChange(event):void {
    const reasonVal = event.target.value;
    this.absenceService.filterByReason(reasonVal).subscribe(abs => this.absences = abs);
  }

  getAbsences(): void {
    this.absenceService.getAbsences().subscribe(abs=> this.absences = abs);
  }

  sortByEmissionDate(): void {
    this.absenceService.sortByEmissionDate().subscribe(abs=> this.absences = abs);
  }

  sortByStartDate(): void {
    this.absenceService.sortByStartDate().subscribe(abs=> this.absences = abs);
  }


}

