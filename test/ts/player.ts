class Player {
  Characters:Character[];
  ActiveCharacter:Character;
  FocusedCharacter:Character;

  constructor(characters:Character[]) {
      this.Characters = characters;
      this.ActiveCharacter = this.Characters[0];
      this.FocusedCharacter = this.Characters[0];
  }  

}