var BaseStats = (function () {
    function BaseStats() {
    }
    return BaseStats;
}());
var CardGame = (function () {
    function CardGame() {
    }
    CardGame.prototype.Init = function (player, encounter) {
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
    };
    CardGame.prototype.CreateDeck = function (cards) {
        return new Deck(cards);
    };
    CardGame.prototype.PlayerDraw = function (count) {
        this.Player.ActiveCharacter.Hand.Draw(this.Player.ActiveCharacter.Deck.RemoveTop(count));
        this.Visuals.DisplayHand(this.Player.ActiveCharacter.Hand);
        this.Refresh();
        this.CheckGameState();
    };
    CardGame.prototype.PlayerPlayCard = function (index) {
        this.Player.ActiveCharacter.Hand.Cards[index].Play(this, index);
        this.Refresh();
        this.CheckGameState();
    };
    CardGame.prototype.EncounterTurn = function () {
        this.Encounter.BeginTurn();
        this.Refresh();
        this.CheckGameState();
    };
    CardGame.prototype.ShuffleIntoDeck = function (card) {
        this.Player.ActiveCharacter.Deck.ShuffleInto(card);
    };
    CardGame.prototype.Refresh = function () {
        this.Visuals.DisplayHand(this.Player.ActiveCharacter.Hand);
        this.Visuals.DisplayCharacters(this.Player.Characters);
    };
    CardGame.prototype.SetPlayerFocus = function (index) {
        this.Visuals.DisplayHand(this.Player.Characters[index].Hand);
    };
    CardGame.prototype.SetupCharacterClickHandlers = function () {
        var _this = this;
        $('#player_character0').click(function () { _this.SetPlayerFocus(0); });
        $('#player_character1').click(function () { _this.SetPlayerFocus(1); });
    };
    CardGame.prototype.CheckGameState = function () {
        this.CheckPlayerStatus();
    };
    CardGame.prototype.CheckPlayerStatus = function () {
        if (!(this.CheckCharacterHealth(this.Player.Characters))) {
            alert('you dead');
        }
    };
    CardGame.prototype.CheckCharacterHealth = function (characters) {
        var x = 0, playerAlive = false;
        for (var _i = 0, characters_1 = characters; _i < characters_1.length; _i++) {
            var x_1 = characters_1[_i];
            if (x_1.Stats.CurrentHealth <= 0) {
                x_1.Status = "dead";
            }
            else {
                playerAlive = true;
            }
        }
        return playerAlive;
    };
    return CardGame;
}());
var CardScriptHandler = (function () {
    function CardScriptHandler(game) {
        this.Game = game;
    }
    CardScriptHandler.prototype.Play = function () {
    };
    return CardScriptHandler;
}());
var Card = (function () {
    function Card(name, script) {
        this.Name = name;
        this.Script = script;
    }
    Card.prototype.Play = function (game, position) {
        this.Script.PlayAction(game, position);
    };
    return Card;
}());
var Character = (function () {
    function Character(name, deck, stats) {
        this.Name = name;
        this.Deck = deck;
        this.Stats = stats;
        this.Hand = new Hand(this.Deck);
        this.Hand.Draw(this.Deck.RemoveTop(5));
    }
    return Character;
}());
var CharacterStats = (function () {
    function CharacterStats(maxHealth, initiative) {
        this.MaxHealth = maxHealth;
        this.CurrentHealth = maxHealth;
        this.Initiative = initiative;
    }
    return CharacterStats;
}());
var Deck = (function () {
    function Deck(startingCards) {
        this.Cards = startingCards;
    }
    Deck.prototype.Shuffle = function () {
        var counter = this.Cards.length;
        // While there are elements in the array
        while (counter > 0) {
            // Pick a random index
            var index = Math.floor(Math.random() * counter);
            // Decrease counter by 1
            counter--;
            // And swap the last element with it
            var temp = this.Cards[counter];
            this.Cards[counter] = this.Cards[index];
            this.Cards[index] = temp;
        }
    };
    Deck.prototype.RemoveTop = function (number) {
        return this.Cards.splice(0, number);
    };
    Deck.prototype.ShuffleInto = function (card) {
        this.Cards.push(card);
        this.Shuffle();
    };
    return Deck;
}());
var Encounter = (function () {
    function Encounter(name, game, entities) {
        this.Name = name;
        this.Game = game;
        this.Entities = entities;
    }
    Encounter.prototype.BeginTurn = function () {
        this.Entities[0].PlayCards(this.Game);
    };
    return Encounter;
}());
var Entity = (function () {
    function Entity(name, deck, stats) {
        this.Name = name;
        this.Deck = deck;
        this.EntityStats = stats;
    }
    Entity.prototype.PlayCards = function (game) {
        var x = 0;
        var cards = this.Deck.RemoveTop(this.EntityStats.CardsPlayed);
        for (x = 0; x < cards.length; x++) {
            cards[x].Play(game, 0);
        }
    };
    return Entity;
}());
var EntityStats = (function () {
    function EntityStats(maxHealth, initiative, cardsPlayed) {
        this.MaxHealth = maxHealth;
        this.CurrentHealth = maxHealth;
        this.Initiative = initiative;
        this.CardsPlayed = cardsPlayed;
    }
    return EntityStats;
}());
var FireBall /*extends Card*/ = (function () {
    function FireBall() {
    }
    FireBall.prototype.PlayAction = function (game, position) {
        game.Player.ActiveCharacter.Hand.Cards.splice(position, 1);
        game.MessageHandler.UpdateMessageText("Cast Fireball!");
        game.Player.ActiveCharacter.Deck.ShuffleInto(new Card("fireball", this));
    };
    return FireBall;
}());
var Hand = (function () {
    function Hand(Deck) {
        this.Cards = new Array();
        this.Draw(Deck.RemoveTop(5));
    }
    Hand.prototype.Draw = function (cardsToDraw) {
        var hand = this.Cards;
        cardsToDraw.forEach(function (card) {
            if (hand.length < 10) {
                hand.push(card);
            }
            else {
                alert('hand too big');
            }
        });
    };
    return Hand;
}());
var LightningBolt /*extends Card*/ = (function () {
    function LightningBolt() {
    }
    LightningBolt.prototype.PlayAction = function (game, position) {
        game.Player.ActiveCharacter.Hand.Cards.splice(position, 1);
        game.MessageHandler.UpdateMessageText("Cast Lightning Bolt!");
        game.Player.ActiveCharacter.Deck.ShuffleInto(new Card("lightning bolt", this));
    };
    return LightningBolt;
}());
var MessageHandler = (function () {
    function MessageHandler() {
    }
    MessageHandler.prototype.UpdateMessageText = function (message) {
        $('#message').append("<div>" + message + "</div>");
        $('#message').scrollTop($('#message')[0].scrollHeight);
    };
    return MessageHandler;
}());
var Player = (function () {
    function Player(characters) {
        this.Characters = characters;
        this.ActiveCharacter = this.Characters[0];
        this.FocusedCharacter = this.Characters[0];
    }
    return Player;
}());
var TurnManager = (function () {
    function TurnManager(game) {
        this.Game = game;
        this.PlayerNextIndex = 0;
    }
    TurnManager.prototype.Init = function () {
        var _this = this;
        this.PlayerNextIndex = 0;
        $('#playerEndTurnButton').click(function () { return _this.EndPlayerTurn(); });
        this.StartPlayerTurn();
        this.TurnQueue = this.SetupTurnQueue(this.Game.Player.Characters, this.Game.Encounter.Entities);
    };
    TurnManager.prototype.HandleTurnQueue = function () {
    };
    TurnManager.prototype.EndPlayerTurn = function () {
        $('#playerEndTurnButton').prop("disabled", true);
        this.StartEncounterTurn();
    };
    TurnManager.prototype.StartEncounterTurn = function () {
        var _this = this;
        setTimeout(function () {
            _this.Game.EncounterTurn();
            _this.EndEncounterTurn();
        }, 500);
    };
    TurnManager.prototype.EndEncounterTurn = function () {
        this.StartPlayerTurn();
    };
    TurnManager.prototype.StartPlayerTurn = function () {
        this.Game.Player.ActiveCharacter = this.Game.Player.Characters[this.PlayerNextIndex];
        this.Game.Player.FocusedCharacter = this.Game.Player.Characters[this.PlayerNextIndex];
        this.Game.SetPlayerFocus(this.PlayerNextIndex);
        $('#playerEndTurnButton').prop("disabled", false);
        this.HandleNextPlayerTurn();
    };
    TurnManager.prototype.HandleNextPlayerTurn = function () {
        if (this.PlayerNextIndex < (this.Game.Player.Characters.length - 1)) {
            this.PlayerNextIndex = this.PlayerNextIndex + 1;
        }
        else {
            this.PlayerNextIndex = 0;
        }
    };
    TurnManager.prototype.SetupTurnQueue = function (characters, entities) {
        var q = [];
        for (var _i = 0, characters_2 = characters; _i < characters_2.length; _i++) {
            var c = characters_2[_i];
            q.push(new QueueObject(c.Stats.Initiative, c));
        }
        for (var _a = 0, entities_1 = entities; _a < entities_1.length; _a++) {
            var e = entities_1[_a];
            q.push(new QueueObject(e.EntityStats.Initiative, e));
        }
        var d = q.sort(function (c1, c2) { return c1.Initiative - c2.Initiative; });
        console.log(d);
        var v = this.FlattenTurnQueue(d.reverse());
        console.log(v);
        return v;
    };
    TurnManager.prototype.FlattenTurnQueue = function (entity) {
        var q = [];
        for (var _i = 0, entity_1 = entity; _i < entity_1.length; _i++) {
            var x = entity_1[_i];
            if (x.Entity instanceof Character) {
                q.push(x.Entity);
            }
            if (x.Entity instanceof Entity) {
                q.push(x.Entity);
            }
        }
        return q;
    };
    return TurnManager;
}());
var QueueObject = (function () {
    function QueueObject(initiative, entity) {
        this.Initiative = initiative;
        this.Entity = entity;
    }
    return QueueObject;
}());
var Visuals = (function () {
    function Visuals(playerDeck, playerHand) {
        this.PlayerDeck = playerDeck;
        this.PlayerHand = playerHand;
    }
    Visuals.prototype.DisplayHand = function (hand) {
        var x = 0;
        for (x = 0; x < 10; x++) {
            var slot = '#handslot_' + x;
            if (hand.Cards[x] == null) {
                $(slot).text("empty");
            }
            else {
                $(slot).text(hand.Cards[x].Name);
            }
        }
    };
    Visuals.prototype.DisplayCharacters = function (characters) {
        $('#playercharacters').html("<span></span");
        var x = 0;
        for (x = 0; x < characters.length; x++) {
            var hp = ' (' + characters[x].Stats.CurrentHealth + '/' + characters[x].Stats.MaxHealth + ') ';
            $('#playercharacters').append('<span id="player_character' + x + '"> ' + characters[x].Name + hp + ' </span>');
        }
    };
    return Visuals;
}());
var WolfBite /*extends Card*/ = (function () {
    function WolfBite() {
    }
    WolfBite.prototype.PlayAction = function (game) {
        var damage = 3;
        game.Player.ActiveCharacter.Stats.CurrentHealth = (game.Player.ActiveCharacter.Stats.CurrentHealth - damage);
        console.log(game.Player.ActiveCharacter.Stats.CurrentHealth);
        game.MessageHandler.UpdateMessageText("Cast Wolf Bite!");
        game.MessageHandler.UpdateMessageText("Wolf Bite does " + damage + " damage!");
    };
    return WolfBite;
}());
