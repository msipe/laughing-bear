interface ICardScript {
 PlayAction:(game:CardGame, position:number/*These parameters will be updated to a custom "script param class object"*/) => any; 
}