class Encounter {
    Name:string;
    Game:CardGame;
    Entities:Entity[];

    constructor(name:string, game:CardGame, entities:Entity[]) {
      this.Name = name;
      this.Game = game;
      this.Entities = entities;
    }

    public BeginTurn():void {
      this.Entities[0].PlayCards(this.Game);
    }   
}
