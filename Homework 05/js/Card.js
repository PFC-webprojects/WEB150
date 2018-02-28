/*
Homework #5 - Robo Dealer

Peter Caliandro
WEB 150
Winter 2018
February 26, 2018

Card.js

*/

/**
 * 
 * @type type
 */
class Card {
    /**
     * 
     * @param {type} value .   String, such as "King", "Ace", "2", et cetera.
     * @param {type} suit .    String, such as "Hearts", "Diamonds", et cetera.
     * @param {type} points .  Int, for blackjack.  Ace is worth 1 point here.
     * @param {type} rank .    Int, for sorting the Cards in a Hand. 
     * @param {type} image .   String: Unicode characters depicting playing cards.
     * @returns {Card}
     */
    constructor(
        value,  
        suit,  
        points,  
        rank,  
        image  
        ) {
        this.name   = "Card";
        this.value  = value;
        this.suit   = suit;
        this.points = points;
        this.rank   = rank;
        this.image  = image;
    }
}