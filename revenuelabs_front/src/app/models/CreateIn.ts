
export class CreateIn {
  age: string;
  armor: string;
  attack: number;
  build_time: number;
  cost: {};
  expansion: string;
  hit_points: number;
  id: number;
  line_of_sight: number;
  name: string;
  range: string;
  reload_time: number;
  special: Array<number>

  constructor(
  pAge: string,
  pArmor: string,
  pAttack: number,
  pBuild_time: number,
  pCost: {},
  pExpansion: string,
  pHit_points: number,
  pId: number,
  pLine_of_sight: number,
  pName: string,
  pRange: string,
  pReload_time: number,
  pSpecial: Array<number>
  ) {

  this.age = pAge;
  this.armor= pArmor;
  this.attack= pAttack;
  this.build_time= pBuild_time;
  this.cost= pCost;
  this.expansion= pExpansion;
  this.hit_points= pHit_points;
  this.id= pId;
  this.line_of_sight= pLine_of_sight;
  this.name= pName;
  this.range= pRange;
  this.reload_time= pReload_time;
  this.special= pSpecial;

  }

}
