class Card {
  Name:string;
  Script:ICardScript;
  

  constructor(name:string, script:ICardScript) {
    this.Name = name;
    this.Script = script;
  }

  public Play(game:CardGame, position:number):void {
    this.Script.PlayAction(game, position);
  }
}