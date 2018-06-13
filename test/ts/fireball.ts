class FireBall /*extends Card*/ implements ICardScript {
  public PlayAction(game:CardGame, position:number):void {
    game.Player.ActiveCharacter.Hand.Cards.splice(position, 1);
    game.MessageHandler.UpdateMessageText("Cast Fireball!");
    game.Player.ActiveCharacter.Deck.ShuffleInto(new Card("fireball", this))
  }
}