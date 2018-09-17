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
  statusInProgress: string = 'InProgress';

  public seeAll:boolean = true;
  public buttonName:any = 'See All';

  ReasonForm: FormGroup;
  reasons: string[] = ['No Filter', 'PaidVacation', 'RTT', 'SickChild', 'LeaveFamilyEvents'];

  
  constructor(
    private absenceService: AbsenceService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.choiceForm = this.fb.group({
      choiceControl: ['Order by Nothing']
    });
    this.ReasonForm = this.fb.group({
      ReasonControl: ['No Filter']
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
      this.getAbsencesInProgress();
    }
    else{
      this.isManager = false;
      this.isEmployee = true;
      this.getAbsences();
    }
    console.log(this.role);
  }

  changeStatus(status: string, absence: Absence){
    let absenceToChange = absence;
    absenceToChange.status = status;
    this.absenceService.changeStatus(absenceToChange).subscribe(a => absenceToChange = a);
  }

  getAbsencesInProgress(): void {
    this.absenceService.getAbsencesInProgress(this.statusInProgress).subscribe(abs => this.absences = abs);
  }

  toggle() {
    this.seeAll = !this.seeAll;
    if(this.seeAll)  {
      this.buttonName = "See All";
      this.getAbsencesInProgress();
    }
    else{
      this.buttonName = "See In Progress";
      this.getAbsences();
    }
  }
}
