import { Component, Input, OnInit } from '@angular/core';
import { AppliesTo } from 'src/app/models/AppliesTo';
import { CreateIn } from 'src/app/models/CreateIn';
import { UniqueTech } from 'src/app/models/UniqueTech';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-unique-tech',
  templateUrl: './unique-tech.component.html',
  styleUrls: ['./unique-tech.component.scss']
})
export class UniqueTechComponent implements OnInit {

  @Input() uniqueTech: UniqueTech[];
  @Input() uniqueTech2: UniqueTech[];

  appliesTo: Array<AppliesTo>
  developsIn: Array<CreateIn>

  showAppliesTo: boolean = false;
  showDevelopsIn: boolean = false;

  constructor(private APIService: ApiService) {

    this.appliesTo = [];
    this.developsIn = [];
  }

  async handleGetUrlDevelopsIn(url: string) {

    if (!this.showDevelopsIn && url.length !== 0) {
      await this.APIService.postUrlExtraData(url).then((res) => {

        this.developsIn = res.extraData;

      }).catch(err => {
        console.log(err)
      });
      this.showDevelopsIn = true;
    }  else if (url.length === 0) {

//       this.message = 'no data is available'
// this.resetResponse();

    } else {
      this.showDevelopsIn = false;
    }
  }

  async handleGetUrlAppliesTo(url: Array<string>){
    if (!this.showAppliesTo && url.length !== 0) {
      await this.APIService.postUrlExtraData(url[0]).then((res) => {
       this.appliesTo = res.extraData
      }).catch(err => {
        console.log(err)
      });
      this.showAppliesTo = true;
    } else if (url.length === 0) {
      // this.message = 'no data is available'
      // this.resetResponse();
    } else {
      this.showAppliesTo = false;
    }
  }
  ngOnInit(): void {
  }
}
