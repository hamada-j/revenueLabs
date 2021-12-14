import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Civilization } from 'src/app/models/Civilization';
import { UniqueTech } from 'src/app/models/UniqueTech';
import { UniqueUnit } from 'src/app/models/UniqueUnit';
import { ApiService } from 'src/app/service/api.service';

import { mergeObjects } from '../../utils/mergeObjects';

@Component({
  selector: 'app-favorite-civilization',
  templateUrl: './favorite-civilization.component.html',
  styleUrls: ['./favorite-civilization.component.scss']
})
export class FavoriteCivilizationComponent implements OnInit {

  id: number;
  civilization: Array<Civilization>;
  uniqueUnit: Array<UniqueUnit>
  uniqueTech: Array<UniqueTech>

  showUniqueUnit: boolean = false;
  showUniqueTech: boolean = false;
  favorites: boolean = false;

  message: string;

  constructor(private router: Router, private route: ActivatedRoute, private APIService: ApiService) {

    this.civilization = [];
    this.uniqueUnit = [];
    this.uniqueTech = [];
    this.message = '';
   }

  // Methods
  async handleGetUrlUniqueUnit(url: any) {
    // Handle Possibilities
    // Goths Koreans Spanish
    if (!this.showUniqueUnit && url.length !== 0) {
      await this.APIService.postUrlExtraData(url[0]).then(async (res) => {
        if (url.length === 2){
          await this.APIService.postUrlExtraData(url[1]).then((response) => {
            let arr = [];
            arr.push(res.extraData[0])
            arr.push(response.extraData[0])
            let output = [];
            // merge both objects
            mergeObjects(arr, output);
            this.uniqueUnit = output;
          }).catch(err => {
            console.log(err)
          })
        } else {
          this.uniqueUnit = res.extraData
        }
      }).catch(err => {
          console.log(err)
      });
      this.showUniqueUnit = true;
    }  else if (url.length === 0) {
      this.message = 'no data is available'
      this.resetResponse();
    }
    // else if (typeof url === 'string'){
    //   console.log(url)
    // }
    else {
      this.showUniqueUnit = false;
    }
  }

  async handleGetUrlUniqueTech(url: any) {
    if (!this.showUniqueTech && url.length !== 0) {
      await this.APIService.postUrlExtraData(url[0]).then( async (res) => {
        if (url.length === 2){
          await this.APIService.postUrlExtraData(url[1]).then((response) => {
            let arr = [];
            arr.push(res.extraData[0])
            arr.push(response.extraData[0])
            let output = [];
            mergeObjects(arr, output);
            this.uniqueTech = output;
          }).catch(err => {
            console.log(err)
          })
        } else {
          this.uniqueTech = res.extraData
        }
      }).catch(err => {
          console.log(err)
      })
      this.showUniqueTech = true;
    } else if (url.length === 0) {
      this.message = 'no data is available'
      this.resetResponse();
    } else {
      this.showUniqueTech = false;
    }
  }

  resetResponse(){
    setTimeout(async () => {
      this.message = '';
    }, 3000);
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.favorites =  this.route.snapshot.params.favorite === 'true' ? true : false;
    this.APIService.getOneCivilization(this.id ).subscribe((data: any) => {
      this.civilization = data.civilization;
    })
  }
}
