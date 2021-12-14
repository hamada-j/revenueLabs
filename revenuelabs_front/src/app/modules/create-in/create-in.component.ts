import { Component, Input, OnInit } from '@angular/core';
import { CreateIn } from 'src/app/models/CreateIn';

@Component({
  selector: 'app-create-in',
  templateUrl: './create-in.component.html',
  styleUrls: ['./create-in.component.scss']
})
export class CreateInComponent implements OnInit {

   @Input() createIn: CreateIn[];

  constructor() { }

  ngOnInit(): void {
  }

}
