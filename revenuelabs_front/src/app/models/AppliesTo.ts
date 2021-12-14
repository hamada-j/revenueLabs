
export class AppliesTo {
  army_type: string;
  civilization_bonus: Array<string>;
  expansion: string;
  id: number;
  name: string;
  team_bonus: string;
  unique_tech: Array<string>;
  unique_unit: Array<string>;

  constructor(
    pArmy_type: string,
    pCivilization_bonus: Array<string>,
    pExpansion: string,
    pId: number,
    pName: string,
    pTeam_bonus: string,
    pUnique_tech: Array<string>,
    pUnique_unit: Array<string>,
  ) {

    this.army_type = pArmy_type;
    this.civilization_bonus = pCivilization_bonus;
    this.expansion = pExpansion;
    this.id = pId;
    this.name = pName;
    this.team_bonus = pTeam_bonus;
    this.unique_tech = pUnique_tech;
    this.unique_unit = pUnique_unit;

  }

}
