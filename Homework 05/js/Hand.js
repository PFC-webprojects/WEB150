/*
Homework #5 - Robo Dealer

Peter Caliandro
WEB 150
Winter 2018
February 26, 2018

Hand.js

*/

/**
 * 
 * @type type
 */
class Hand {
    /**
     * 
     * @returns {Hand}
     */
    constructor() {
        this.name = "Hand";
        this.cards = [];  //  Array of Card objects.
        this.resetCount();
        this.resetDisplayString();
        this.resetBlackjackScore();
        this.resetPokerCategory();
    }
    
    /**
     * 
     * @param {type} card
     * @returns {undefined}
     */
    add(card) {
        this.cards.push(card);
        this.resetCount();
        this.resetDisplayString();
        this.resetBlackjackScore();
        this.resetPokerCategory();
    }
    
    /**
     * Sort by rank, descending.
     * 
     * @returns {Hand}
     */
    sortByRank() {
        this.cards.sort(function(card0, card1) {
            return card1.rank - card0.rank;
        });
        this.resetDisplayString();
        return this;
    }

    /**
     * Sort by suit name, ascending.
     * 
     * @returns {Hand}
     */
    sortBySuit() {
        this.cards.sort(function(card0, card1) {
            return  card0.suit < card1.suit  ?  -1  :
                    card0.suit > card1.suit  ?   1  :  0;
        });
        this.resetDisplayString();
        return this;
    }

    
/*  The below functions are to be called internally to reset a Hand's properties
 *  when methods that change a Hand object are performed.
 */

    /**
     * 
     * @returns {undefined}
     */
    resetCount() {
        this.count = this.cards.length;
    }
    
    /**
     * 
     * @returns {undefined}
     */
    resetDisplayString() {
        var strDisplay = "";
        this.cards.forEach(function(card) {
            strDisplay += card.image;
        });
        this.displayString = strDisplay;
    }
    
    /**
     * 
     * @returns {undefined}
     */
    resetBlackjackScore() {
        var score = 0;
        this.cards.forEach(function(card) {
            score += card.points;
        });
        this.blackjackScore = score;
    }

    /**
     * This function has yet to be implemented.  It is a compellingly
     * interesting exercise that I don't have time for at this moment.
     * I hope to complete it some day.
     * 
     * @returns {undefined} .  Categories will be Strings such as
     * "Straight Flush", "Full House", "Two Pair", et cetera, or possibly
     * PokerRank objects consisting of name and rank properties.
     */
    resetPokerCategory() {  //  Note to self:  I might have to revise the ranks.
        this.pokerCategory = null;
    }
}
