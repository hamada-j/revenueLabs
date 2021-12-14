import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Civilization } from '../models/Civilization';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // array of civilizations
  arrCivilizations: Array<Civilization>

  constructor(private APIService: ApiService, private router: Router) {
    this.arrCivilizations = [];
  }

  // redirectTo specific civilization
  handleRedirectToCivilization(id: string){
    this.router.navigate([`civilization/${id}`]);
  }

  // ng get data form api
  ngOnInit() {
    this.APIService.getCivilization().subscribe((data: any) => {
      this.arrCivilizations = data.civilizations;
    })
  }
}
