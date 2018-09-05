import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-app-reason',
  templateUrl: './app-reason.component.html',
  styleUrls: ['./app-reason.component.css']
})
export class AppReasonComponent implements OnInit {

  ReasonForm: FormGroup;
  reasons: string[] = ['No Filter','PaidVacation','RTT','SickChild','LeaveFamilyEvents'];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.ReasonForm = this.fb.group({
      ReasonControl: ['No Filter']});
  }

}
