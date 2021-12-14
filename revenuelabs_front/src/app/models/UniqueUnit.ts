export class UniqueUnit {
  age: string;
  armor: string
  attack: number;
  attack_bonus: Array<string>;
  build_time: number;
  cost: {};
  created_in: string;
  description: string;
  expansion: string;
  hit_points: number;
  id: number;
  line_of_sight: number;
  movement_rate: number;
  name: string;
  reload_time: number;

  constructor(
    pAge: string,
    pArmor: string,
    pAttack: number,
    pAttack_bonus: Array<string>,
    pBuild_time: number,
    pCost: {},
    pCreated_in: string,
    pDescription: string,
    pExpansion: string,
    pHit_points: number,
    pId: number,
    pLine_of_sight: number,
    pMovement_rate: number,
    pName: string,
    pReload_time: number,
  ) {

  this.age = pAge;
  this.armor = pArmor;
  this.attack = pAttack;
  this.attack_bonus = pAttack_bonus;
  this.build_time = pBuild_time;
  this.cost = pCost;
  this.created_in = pCreated_in;
  this.description = pDescription;
  this.expansion = pExpansion;
  this.hit_points = pHit_points;
  this.id = pId;
  this.line_of_sight = pLine_of_sight;
  this.movement_rate = pMovement_rate;
  this.name = pName;
  this.reload_time = pReload_time;

  }

}

