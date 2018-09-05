import { Component, OnInit } from '@angular/core';
import {AbsenceService} from '../absence.service';

@Component({
  selector: 'app-absence-request',
  templateUrl: './absence-request.component.html',
  styleUrls: ['./absence-request.component.css']
})
export class AbsenceRequestComponent implements OnInit {

  constructor(private absenceService: AbsenceService) { }

  ngOnInit() {
  }

  submit():void {
    this.absenceService.submit();
  }
}
