import { Component, OnInit, Directive, HostListener } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { AbsenceService } from '../absence.service';
import { Absence } from '../absence';

@Component({
  selector: 'app-absences',
  templateUrl: './absences.component.html',
  styleUrls: ['./absences.component.css']
})
@Directive({ selector: '[app-app-reason]' })

export class AbsencesComponent implements OnInit {
  choiceForm: FormGroup;
  absences: Absence[];
  choices: string[] = ['Nothing', 'Emission date', 'Start Date'];
  displayedColumns: string[] = ['Date', 'Reason', 'Start', 'End', 'Status', 'Validation'];

  sortChoice = 'Nothing';
  reasonChoice: string = null;
  role: string;
  isManager: boolean = false;
  isEmployee: boolean = true;
  statusInProgress: string = 'In progress';

  public seeAll: boolean = true;
  public buttonName: any = 'See All';

  ReasonForm: FormGroup;
  reasons: string[] = [];

  constructor(
    private absenceService: AbsenceService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.reasons.push('No Filter');
    this.absenceService.getReasons().subscribe(r => this.reasons = this.reasons.concat(r));
    this.choiceForm = this.fb.group({
      choiceControl: ['Nothing']
    });
    this.ReasonForm = this.fb.group({
      ReasonControl: ['No Filter']
    });
    this.getAbsences();
  }


  onChangeChoice(choiceValue: string): void {
    console.log(choiceValue);
    this.sortChoice = choiceValue;
    if (this.sortChoice === 'Emission date') {
      this.sortChoice = 'emissionDate';
    } else if (this.sortChoice === 'Start Date') {
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

  changeRole(role: string): void {
    if (role != this.role) {
      this.role = role;
    }

    if (this.role == "Manager") {
      this.isManager = true;
      this.isEmployee = false;
      this.getAbsencesInProgress();
    }
    else {
      this.isManager = false;
      this.isEmployee = true;
      this.getAbsences();
    }
    console.log(this.role);
  }

  changeStatus(status: string, absence: Absence) {
    let absenceToChange = absence;
    absenceToChange.status = status;
    this.absenceService.changeStatus(absenceToChange).subscribe(a => absenceToChange = a);
  }

  getAbsencesInProgress(): void {
    this.absenceService.getAbsencesInProgress(this.statusInProgress).subscribe(abs => this.absences = abs);
  }

  toggle() {
    this.seeAll = !this.seeAll;
    if (this.seeAll) {
      this.buttonName = "See All";
      this.getAbsencesInProgress();
    }
    else {
      this.buttonName = "See In Progress";
      this.getAbsences();
    }
  }
}
