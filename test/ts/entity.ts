class Entity {
  Name:string;
  Deck:Deck;
  EntityStats:EntityStats;

  constructor(name:string, deck:Deck, stats:EntityStats) {
    this.Name = name;
    this.Deck = deck;
    this.EntityStats = stats;
  }

  public PlayCards(game:CardGame):void {
    let x=0;
    let cards = this.Deck.RemoveTop(this.EntityStats.CardsPlayed);
    for (x = 0; x < cards.length; x++) {
      cards[x].Play(game, 0);
      
    }
  }
}

class EntityStats implements BaseStats {
  MaxHealth:number;
  CurrentHealth:number;
  Initiative:number;
  CardsPlayed:number;

  constructor(maxHealth:number, initiative:number, cardsPlayed:number) {
    this.MaxHealth = maxHealth;
    this.CurrentHealth = maxHealth;
    this.Initiative = initiative;
    this.CardsPlayed = cardsPlayed;
  }
}