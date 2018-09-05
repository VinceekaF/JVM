import { Component, OnInit } from '@angular/core';
import { AbsenceService } from '../absence.service';
import { Absence } from '../absence';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AppReasonComponent }  from '../app-reason/app-reason.component'


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
  sortChoice: string = 'Order by Nothing';
  reasonChoice: string = 'No Filter';
  reasons: string[] = ['No Filter','PaidVacation','RTT','SickChild','LeaveFamilyEvents'];
 

  constructor(private absenceService: AbsenceService, private fb: FormBuilder) { }


  ngOnInit() {
    this.choiceForm = this.fb.group({
      choiceControl: ['Order by Nothing']});
    this.filterByReasonForm = this.fb.group({
      filterByReasonControl: ['No Filter']});
    this.getAbsences();
  }
  
  onChange(choiceValue: string):void {
    this.sortChoice = choiceValue;
    if (this.sortChoice =='Order by Emission date'){
      this.sortChoice = 'emissionDate';
    }
    else if(this.sortChoice == 'Order by Start Date'){
      this.sortChoice = 'startDate';
    }
   
    this.GetAbsencesFilteredAndSorted();
  }
  
  filterChange(reasonValue: string):void {
    this.reasonChoice = reasonValue;
    console.log(this.reasonChoice);
    if (this.reasonChoice != 'No Filter'){
      this.GetAbsencesFilteredAndSorted();
    }
    else{
      this.getAbsences();
    }
  }
  

  GetAbsencesFilteredAndSorted(): void {
    this.absenceService.GetAbsencesFilteredAndSorted(this.reasonChoice,this.sortChoice).subscribe(abs=> this.absences = abs);
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

