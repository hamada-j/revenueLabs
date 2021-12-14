import { Component, Input, OnInit } from '@angular/core';
import { CreateIn } from 'src/app/models/CreateIn';

@Component({
  selector: 'app-develops-in',
  templateUrl: './develops-in.component.html',
  styleUrls: ['./develops-in.component.scss']
})
export class DevelopsInComponent implements OnInit {

  @Input() developsIn: CreateIn[];

  constructor() { }

  ngOnInit(): void {
  }

}
