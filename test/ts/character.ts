class Character {
     Status: string;
   Name:string;
    Deck:Deck;
    Hand:Hand;
    Stats:CharacterStats;

    constructor(name:string, deck:Deck, stats:CharacterStats) {
      this.Name = name;
      this.Deck = deck;
      this.Stats = stats;
      this.Hand = new Hand(this.Deck);
      this.Hand.Draw(this.Deck.RemoveTop(5));
    }

    
}

class CharacterStats implements BaseStats {
    MaxHealth:number;
    CurrentHealth:number;
    Initiative:number;

    constructor (maxHealth:number, initiative:number) {
      this.MaxHealth = maxHealth;
      this.CurrentHealth = maxHealth;
      this.Initiative =initiative;
    }
}