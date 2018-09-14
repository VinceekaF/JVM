import { Component, OnInit, Directive, HostListener } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { AbsenceService } from '../absence.service';
import { Absence } from '../absence';

@Component({
  selector: 'app-absences',
  templateUrl: './absences.component.html',
  styleUrls: ['./absences.component.css']
})
@Directive({selector: '[app-app-reason]'})

export class AbsencesComponent implements OnInit {
  choiceForm: FormGroup;
  absences: Absence[];
  choices: string[] = ['Order by Nothing', 'Order by Emission date', 'Order by Start Date'];
  displayedColumns: string[] = ['Date', 'Reason', 'Start', 'End', 'Status','Validation'];

  sortChoice = 'Order by Nothing';
  reasonChoice: string = null;
  role: string;
  isManager:boolean = false;
  isEmployee:boolean = true;
  // reasons: string[] = ['No Filter', 'PaidVacation', 'RTT', 'SickChild', 'LeaveFamilyEvents']; //needed ??

  
  constructor(
    private absenceService: AbsenceService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.choiceForm = this.fb.group({
      choiceControl: ['Order by Nothing']
    });
    this.getAbsences();
  }
  
  
  onChangeChoice(choiceValue: string): void {
    console.log(choiceValue);
    this.sortChoice = choiceValue;
    if (this.sortChoice === 'Order by Emission date') {
      this.sortChoice = 'emissionDate';
    } else if (this.sortChoice === 'Order by Start Date') {
      this.sortChoice = 'startDate';
    }
    
    this.getAbsencesFilteredAndSorted();
  }
  
  onChangeFilter(reasonValue: string): void {
    console.log(reasonValue);

    this.reasonChoice = reasonValue;
    if (this.reasonChoice !== 'No Filter') {
      this.getAbsencesFilteredAndSorted();
    } else {
      this.getAbsences();
    }
  }

  getAbsencesFilteredAndSorted(): void {
    this.absenceService.getAbsencesFilteredAndSorted(this.reasonChoice, this.sortChoice).subscribe(abs => this.absences = abs);
  }

  getAbsences(): void {
    this.absenceService.getAbsences().subscribe(abs => this.absences = abs);
  }

  changeRole(role: string): void{
    if(role != this.role){
      this.role = role;
    }

    if (this.role == "Manager"){
      this.isManager = true;
      this.isEmployee = false;
    }
    else{
      this.isManager = false;
      this.isEmployee = true;
    }
    console.log(this.role);
  }

  changeStatus(status: string, id: number){
    console.log(id);
    console.log(status);
    this.absenceService.changeStatus(status,id).subscribe(a => this.absences = a);
  }

  

}
