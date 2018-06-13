class Visuals {
  PlayerHand:Hand;
  PlayerDeck:Deck;

  constructor(playerDeck:Deck, playerHand:Hand) {
    this.PlayerDeck = playerDeck;
    this.PlayerHand = playerHand;
  }
    
  public DisplayHand(hand:Hand):void {
    let x = 0;
    for(x=0; x<10; x++) {
      let slot = '#handslot_' + x;
      if (hand.Cards[x] == null) {
        $(slot).text("empty");
      } else {
        $(slot).text(hand.Cards[x].Name);
      }
    }
  }

  public DisplayCharacters(characters:Character[]):void {
    $('#playercharacters').html("<span></span");
    let x = 0;

    for (x = 0; x < characters.length; x++) {
      let hp = ' (' + characters[x].Stats.CurrentHealth + '/' + characters[x].Stats.MaxHealth + ') ';
      $('#playercharacters').append('<span id="player_character' + x + '"> ' + characters[x].Name + hp + ' </span>')
    }
  }
}