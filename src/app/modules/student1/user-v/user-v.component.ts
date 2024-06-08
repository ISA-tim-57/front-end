import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student1Service } from '../student1.service';

@Component({
  selector: 'app-user-v',
  templateUrl: './user-v.component.html',
  styleUrls: ['./user-v.component.css']
})
export class UserVComponent implements OnInit {

  id!: number;

  constructor(private route: ActivatedRoute, private ss: Student1Service) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.verify();
    });
  }

  verify() {
    this.ss.verifyUser(this.id);
  }
}
