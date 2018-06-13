class Hand {
  Cards:Card[];

  constructor(Deck:Deck) {
    this.Cards = new Array<Card>()
    this.Draw(Deck.RemoveTop(5));
  }

  public Draw(cardsToDraw:Card[]):void {
    let hand = this.Cards;
    cardsToDraw.forEach(
      (card) => {
        if(hand.length <10) {
          hand.push(card)
        } else {
          alert('hand too big')
        }
      }
    );
  }
}