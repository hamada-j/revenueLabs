export class Civilization {
  id: number;
  name: string;
  expansion: string;
  army_type: string;
  unique_unit: Array<string>;
  unique_tech: Array<string>;
  team_bonus: string;
  civilization_bonus: Array<string>;
  favoriteCivilizations: boolean = false;

  constructor(pId: number, pName: string, pExpansion: string, pArmy_type: string, pUnique_unit: any, pUnique_tech: any, pTeam_bonus: any, pCivilization_bonus:any, pFavoriteCivilizations: boolean) {

    this.id = pId;
    this.name = pName || null;
    this.expansion = pExpansion || null;
    this.army_type = pArmy_type || null;
    this.unique_unit = pUnique_unit || null;
    this.unique_tech = pUnique_tech || null;
    this.team_bonus = pTeam_bonus || null;
    this.civilization_bonus = pCivilization_bonus || null;
    this.favoriteCivilizations = pFavoriteCivilizations || false;

  }

}
