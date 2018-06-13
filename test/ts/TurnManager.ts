class TurnManager {
    Game:CardGame;
    PlayerNextIndex:number
    TurnQueue:(Entity | Character)[]

    constructor(game:CardGame) {
      this.Game = game;
      this.PlayerNextIndex = 0;
    }

    public Init():void {
      this.PlayerNextIndex = 0;
      $('#playerEndTurnButton').click(() => this.EndPlayerTurn());
      this.StartPlayerTurn();
      this.TurnQueue = this.SetupTurnQueue(this.Game.Player.Characters, this.Game.Encounter.Entities);
    }

    public HandleTurnQueue():void {
      
    }

    public EndPlayerTurn():void {
      $('#playerEndTurnButton').prop("disabled", true);
      this.StartEncounterTurn();
    }

    public StartEncounterTurn():void {
      setTimeout(() => {
        this.Game.EncounterTurn(); 
        this.EndEncounterTurn()
      }, 500);
    }

    public EndEncounterTurn():void {
        this.StartPlayerTurn();
    }

    public StartPlayerTurn():void {
      this.Game.Player.ActiveCharacter = this.Game.Player.Characters[this.PlayerNextIndex]
      this.Game.Player.FocusedCharacter = this.Game.Player.Characters[this.PlayerNextIndex]
      this.Game.SetPlayerFocus(this.PlayerNextIndex);

      $('#playerEndTurnButton').prop("disabled", false);

      this.HandleNextPlayerTurn();
    }

    private HandleNextPlayerTurn():void {
      if (this.PlayerNextIndex < (this.Game.Player.Characters.length -1)) {
        this.PlayerNextIndex = this.PlayerNextIndex + 1;
      } else {
        this.PlayerNextIndex = 0;
      }
    }    

    public SetupTurnQueue(characters:Character[], entities:Entity[]):(Entity | Character)[] {
      let q:Array<QueueObject> = [];

      for (let c of characters) {
        q.push(new QueueObject(c.Stats.Initiative, c));
      }

      
      for (let e of entities) {
        q.push(new QueueObject(e.EntityStats.Initiative, e));
      }

      let d = q.sort(function(c1,c2) {return c1.Initiative - c2.Initiative});
      console.log(d);
      let v = this.FlattenTurnQueue(d.reverse());
      console.log(v);
      return v;
    }    

    private FlattenTurnQueue(entity:QueueObject[]):Array<Character|Entity> {
      let q:Array<Character|Entity> = [];
      for(let x of entity) {
        if (x.Entity instanceof Character) {
          q.push(x.Entity)
        }
        if (x.Entity instanceof Entity) {
          q.push(x.Entity)
        }
      }
      return q;
    }
}

class QueueObject {
      Initiative:number;
      Entity:object;

      constructor(initiative:number, entity:object) {
        this.Initiative = initiative;
        this.Entity = entity;
      }
    }