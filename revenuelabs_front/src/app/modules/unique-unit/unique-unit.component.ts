import { Component, Input, OnInit } from '@angular/core';
import { CreateIn } from 'src/app/models/CreateIn';
import { UniqueUnit } from 'src/app/models/UniqueUnit';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-unique-unit',
  templateUrl: './unique-unit.component.html',
  styleUrls: ['./unique-unit.component.scss']
})
export class UniqueUnitComponent implements OnInit {

  createIn: Array<CreateIn>

  showCreateIn: boolean = false;

  @Input() uniqueUnit: UniqueUnit[];
  @Input() uniqueUnit2: UniqueUnit[];

  constructor(private APIService: ApiService) {
    this.createIn = [];
  }

  async handleGetUrlCreatedIn(url: string) {
    if (!this.showCreateIn && url.length !== 0) {

      await this.APIService.postUrlExtraData(url).then((res) => {
        this.createIn = res.extraData
      }).catch(err => {
          console.log(err)
      });
      this.showCreateIn = true;
    }  else if (url.length === 0) {

      console.log("to handle case")
      // this.message = 'no data is available'
      // this.resetResponse();
    } else {
      this.showCreateIn = false;
    }
  }

  ngOnInit(): void {
  }
}
