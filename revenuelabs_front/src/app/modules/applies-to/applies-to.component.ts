import { Component, Input, OnInit } from '@angular/core';
import { AppliesTo } from 'src/app/models/AppliesTo';
import { UniqueTech } from 'src/app/models/UniqueTech';
import { UniqueUnit } from 'src/app/models/UniqueUnit';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-applies-to',
  templateUrl: './applies-to.component.html',
  styleUrls: ['./applies-to.component.scss']
})
export class AppliesToComponent implements OnInit {

  uniqueUnit: Array<UniqueUnit>
  uniqueTech: Array<UniqueTech>

  showUniqueUnit2: boolean = false;
  showUniqueTech2: boolean = false;

  @Input() appliesTo: AppliesTo[];

  constructor(private APIService: ApiService) {
    this.uniqueUnit = [];
    this.uniqueTech = [];
  }

  async handleGetUrlUniqueUnit2(url: string) {

    if (!this.showUniqueUnit2 && url.length !== 0) {
      await this.APIService.postUrlExtraData(url[0]).then((res) => {
        this.uniqueUnit = res.extraData
      }).catch(err => {
          console.log(err)
      })
      this.showUniqueUnit2 = true;
    } else if (url.length === 0) {
      // this.message = 'no data is available'
      // this.resetResponse();
    } else {
      this.showUniqueTech2 = false;
    }
  }

  async handleGetUrlUniqueTech2(url: Array<string>) {

    if (!this.showUniqueTech2 && url.length !== 0) {
      await this.APIService.postUrlExtraData(url[0]).then((res) => {
        this.uniqueTech = res.extraData
      }).catch(err => {
          console.log(err)
      })
      this.showUniqueTech2 = true;
    } else if (url.length === 0) {
      // this.message = 'no data is available'
      // this.resetResponse();
    } else {
      this.showUniqueTech2 = false;
    }
  }
  ngOnInit(): void {
  }

}
