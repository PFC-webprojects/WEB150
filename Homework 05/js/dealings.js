/*
Homework #5 - Robo Dealer

Peter Caliandro
WEB 150
Winter 2018
February 26, 2018

dealings.js

*/

const POKER_HAND      =  5;
const BLACKJACK_HAND  =  3;
const BLACKJACK_LIMIT = 21;

/**
 * Deal POKER_HAND Cards to two players.
 * 
 * @returns {undefined}
 */
function dealPokerHands() {
    var deck = new Deck();
    Object.preventExtensions(deck);

    /* Deal each player a Hand, to be sorted by rank, and then within each
     * rank, by suit. */
    var hand1 = deck.deal(POKER_HAND).sortBySuit().sortByRank();
    var hand2 = deck.deal(POKER_HAND).sortBySuit().sortByRank();

    showCards("player1", hand1.displayString);
    showCards("player2", hand2.displayString);

    showMessage("player1", "");
    showMessage("player2", "");
}

/**
 * Deal BLACKJACK_HAND Cards to two players.
 * 
 * @returns {undefined}
 */
function dealBlackjackHands() {
    var deck = new Deck();
    Object.preventExtensions(deck);

    /* Deal each player a Hand, to be sorted by rank, and then within each
     * rank, by suit. */
    var hand1 = deck.deal(BLACKJACK_HAND).sortBySuit().sortByRank();
    var hand2 = deck.deal(BLACKJACK_HAND).sortBySuit().sortByRank();

    showCards("player1", hand1.displayString);
    showCards("player2", hand2.displayString);
    
    showMessage("player1", blackjackMessage(hand1.blackjackScore));
    showMessage("player2", blackjackMessage(hand2.blackjackScore));
}

/**
 * Display a Hand of Cards on the web page.
 * 
 * @param {type} player
 * @param {type} cards
 * @returns {undefined}
 */
function showCards(player, cards) {
    document.getElementById(player).getElementsByClassName("cards")[0]
            .innerHTML = cards;
}

/**
 * Display a message pertaining to a Hand of Cards on the web page.
 * 
 * @param {type} player
 * @param {type} message
 * @returns {undefined}
 */
function showMessage(player, message) {
    document.getElementById(player).getElementsByClassName("message")[0]
            .innerHTML = message;        
}

/**
 * 
 * @param {type} score
 * @returns {String} .  Intended as a parameter to showMessage().
 */
function blackjackMessage(score) {
    var message = "Score: " + score;
    
    if (BLACKJACK_LIMIT < score) {
        message += "." + String.fromCharCode(160) + " That's too high!";    
    }
    
    return message;
}
