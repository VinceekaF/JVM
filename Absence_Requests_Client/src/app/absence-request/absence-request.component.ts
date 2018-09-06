import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { FormControl } from '@angular/forms';
import * as Moment from 'moment'

import { AbsenceService } from '../absence.service';
import { Absence } from '../absence';

@Component({
  selector: 'app-absence-request',
  templateUrl: './absence-request.component.html',
  styleUrls: ['./absence-request.component.css']
})

export class AbsenceRequestComponent implements OnInit {
  reasonChoice: string = 'No Filter';
  formStartDate = new FormControl(new Date());
  formEndDate = new FormControl(new Date());
  startDate: Moment.Moment;
  endDate: Moment.Moment;
  nbOfDays: number;

  constructor(
    private absenceService: AbsenceService,
    private location: Location) { }

  ngOnInit() {
  }

  reasonChange(reasonValue: string): void {
    this.reasonChoice = reasonValue;
  }

  SetDates() {
    let offset: number;
    let nbOfWeekendDays: number;
    this.startDate = Moment(this.formStartDate.value, "M/D/YYYY").startOf("day");
    this.endDate = Moment(this.formEndDate.value, "M/D/YYYY").startOf("day");

    this.nbOfDays = Moment.duration(this.endDate.diff(this.startDate)).asDays();

    if (this.startDate.weekday() == 1 && this.nbOfDays >= 7) {  //check if startDate = Monday
      offset = 5;
    }
    else if (this.startDate.weekday() == 2 && this.nbOfDays >= 6) {
      offset = 4;
    }
    else if (this.startDate.weekday() == 3 && this.nbOfDays >= 5) {
      offset = 3;
    }
    else if (this.startDate.weekday() == 4 && this.nbOfDays >= 4) {
      offset = 2;
    }
    else if (this.startDate.weekday() == 5 && this.nbOfDays >= 3) {
      offset = 1;
    }
    else {
      offset = 0;
    }

    if (offset != 0) {
      nbOfWeekendDays = 2 * (Math.floor((this.nbOfDays - offset) / 7) + 1);
      this.nbOfDays -= nbOfWeekendDays;
    }

    this.nbOfDays++;
  }

  submit(): void {
    //todo : need validation before submit, otherwise some corrupted value could be send
    //both date should be selected

    let absence: Absence = {
      startDate: this.startDate.toDate(),
      endDate: this.endDate.toDate(),

      reason: this.reasonChoice,  //can't be "no filter"

      emissionDate: this.startDate.toDate(),  //need to be current date
      status: "InProgress",
      id: 0 //guid
    };

    this.absenceService.submit(absence).subscribe(a => absence = a);
    this.goBack();  // need to wait before redirect
  }

  goBack(): void {
    this.location.back();
  }
}
