import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { Civilization } from 'src/app/models/Civilization';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-all-civilizations',
  templateUrl: './all-civilizations.component.html',
  styleUrls: ['./all-civilizations.component.scss']
})
export class AllCivilizationsComponent implements OnInit {

  arrFavoriteCivilizations: Array<Civilization>;
  favorites: Array<string>;
  civilization: Array<Civilization>;

  constructor(private APIService: ApiService, private router: Router) {
    this.arrFavoriteCivilizations = [];
    this.favorites = [];
  }

  handleRedirectToCivilization(id: number, favorites: boolean){
    this.router.navigate([`all_favorite_civilizations/${id}/${favorites}`]);
  }

  updateFavoriteCivilizations(event:MatCheckboxChange, civilizationsId: number): void {
    let civilization = civilizationsId;
    let user = localStorage.getItem('userId');
    let data = {
      userId: user,
      civilizationsId: civilization,
      checked: event.checked,
    };
    this.APIService.updateFavoriteCivilization(data).subscribe((data: any) => {
        this.arrFavoriteCivilizations = data.civilizations;
        this.favorites = [];
        for (let i = 0; i < data.civilizations.length; i++) {
          if (data.civilizations[i].favoriteCivilizations === true)
          this.favorites.push(data.civilizations[i].name);
        }
        this.APIService.favorites$.emit(this.favorites);
    });
  }

  ngOnInit() {
    //if (localStorage.getItem("infiniteScrollEnabled") === null){}
    this.APIService.getFavoriteCivilizations(localStorage.getItem('userId')).subscribe((data: any) => {
      this.arrFavoriteCivilizations = data.civilizations;
    })
  }
}
