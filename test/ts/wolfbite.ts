class WolfBite /*extends Card*/ implements ICardScript {
  public PlayAction(game:CardGame):void {
    let damage = 3;
    game.Player.ActiveCharacter.Stats.CurrentHealth = (game.Player.ActiveCharacter.Stats.CurrentHealth - damage)
    console.log(game.Player.ActiveCharacter.Stats.CurrentHealth);
    game.MessageHandler.UpdateMessageText("Cast Wolf Bite!");
    game.MessageHandler.UpdateMessageText("Wolf Bite does " + damage + " damage!");
  }
}