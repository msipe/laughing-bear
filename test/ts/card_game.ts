class CardGame {
 // PlayerHand:Hand;
 // PlayerDeck:Deck;
  Visuals:Visuals;
  MessageHandler:MessageHandler;
  Encounter:Encounter;
  TurnManager:TurnManager;
  Player:Player;
  
  public Init(player:Player, encounter:Encounter):void {
    this.Encounter = encounter;
    this.Player = player;
    //this.PlayerDeck = playerDeck;
    //this.PlayerHand = new Hand(this.PlayerDeck); 
    this.MessageHandler = new MessageHandler();
    this.Visuals = new Visuals(this.Player.ActiveCharacter.Deck, this.Player.ActiveCharacter.Hand);
    this.Visuals.DisplayCharacters(this.Player.Characters);
    this.SetupCharacterClickHandlers();
    this.TurnManager = new TurnManager(this);
    this.TurnManager.Init();    
    this.SetPlayerFocus(0);
  }

  public CreateDeck(cards:Card[]):Deck {
    return new Deck(cards);
  }

  public PlayerDraw(count:number):void {
    this.Player.ActiveCharacter.Hand.Draw(this.Player.ActiveCharacter.Deck.RemoveTop(count));
    this.Visuals.DisplayHand(this.Player.ActiveCharacter.Hand);
    this.Refresh();
    this.CheckGameState()
  }

  public PlayerPlayCard(index:number):void {
    this.Player.ActiveCharacter.Hand.Cards[index].Play(this, index);
    this.Refresh();
    this.CheckGameState()
  }

  public EncounterTurn():void {
    this.Encounter.BeginTurn();
    this.Refresh();
    this.CheckGameState();
  }

  public ShuffleIntoDeck(card:Card):void {
    this.Player.ActiveCharacter.Deck.ShuffleInto(card);
  }

  public Refresh():void {
    this.Visuals.DisplayHand(this.Player.ActiveCharacter.Hand);
    this.Visuals.DisplayCharacters(this.Player.Characters);
  }  

  public SetPlayerFocus(index:number):void {
    this.Visuals.DisplayHand(this.Player.Characters[index].Hand);
  }

  public SetupCharacterClickHandlers():void {
     $('#player_character0').click(() => {this.SetPlayerFocus(0)})
     $('#player_character1').click(() => {this.SetPlayerFocus(1)})
  }

  public CheckGameState():void {
    this.CheckPlayerStatus();    
  }

  private CheckPlayerStatus():void {
    if (!(this.CheckCharacterHealth(this.Player.Characters))) {
      alert('you dead');
    } 
  }

  private CheckCharacterHealth(characters:Character[]):boolean {
    let x = 0, playerAlive = false;

    for( let x of characters) {
      if (x.Stats.CurrentHealth <= 0) {
        x.Status = "dead";
      } else {
        playerAlive = true;
      }      
    }

    return playerAlive
  }
}