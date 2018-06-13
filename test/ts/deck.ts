class Deck {
    Cards:Card[];

    constructor(startingCards:Card[]) {
      this.Cards = startingCards;
    }

    public Shuffle():void {
      let counter = this.Cards.length;

      // While there are elements in the array
        while (counter > 0) {
            // Pick a random index
            let index = Math.floor(Math.random() * counter);
    
            // Decrease counter by 1
            counter--;
    
            // And swap the last element with it
            let temp = this.Cards[counter];
            this.Cards[counter] = this.Cards[index];
            this.Cards[index] = temp;
        }
    }

    public RemoveTop(number:number):Card[] {
      return this.Cards.splice(0,number);
    }

    public ShuffleInto(card:Card) {
      this.Cards.push(card);
      this.Shuffle();
    }
}