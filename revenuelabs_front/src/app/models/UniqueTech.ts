

export class UniqueTech {
  age: string;
  applies_to: Array<string>;
  build_time: number;
  cost: {};
  description: string;
  develops_in: string;
  expansion: string;
  id: number;
  name: string;

  constructor(
    pAge: string,
    pApplies_to: Array<string>,
    pBuild_time: number,
    pCost: {},
    pDescription: string,
    pDevelops_in: string,
    pExpansion: string,
    pId: number,
    pName: string,
  ) {

  this.age = pAge;
  this.applies_to = pApplies_to;
  this.build_time = pBuild_time;
  this.cost = pCost;
  this.description = pDescription;
  this.develops_in = pDevelops_in;
  this.expansion = pExpansion;
  this.id = pId;
  this.name = pName;

  }

}
