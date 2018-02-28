/*
Homework #5 - Robo Dealer

Peter Caliandro
WEB 150
Winter 2018
February 26, 2018

Deck.js

*/

/**
 * 
 * @type type
 */
class Deck {
    /**
     * 
     * @returns {Deck}
     */
    constructor() {
        /*  Retrieve Deck source string; split it into an array of strings;
            for each of those, split that into an array strings,
            create a new Card object, and assign the
            sub-array's elements to the Card's properties;
            assign the resulting array of Card objects to this Deck object's
            cards property.  */
        this.name = "Deck";
        this.cards = getSource().split("\n").map(strOriginal => {
            var arrSplit = strOriginal.split("\t");
            var card = new Card(
                arrSplit[0],               //  value   (string)
                arrSplit[1],               //  suit    (string)
                parseInt(arrSplit[2]),     //  points  (int)
                parseInt(arrSplit[3]),     //  rank    (int)
                arrSplit[4]                //  image   (string)
            );
            Object.preventExtensions(card);
            return card;
        });
        this.resetCount();
    }

    /**
     * This method is to be used internally whenever a method is called. 
     * 
     * @returns {undefined}
     */
    resetCount() {
        this.count = this.cards.length;
    }

    /**
     * This method produces a hand whose cards are selected at random from the
     * remaining cards in the deck.
     * 
     * @param {type} intCards .  How many cards are to be dealt to a player.
     * @returns {Deck.deal.hand|Hand}
     */
    deal(
        intCards
    ) {
        var hand = new Hand();
        Object.preventExtensions(hand);
        for (var i = 0; i < intCards; i++) {
            var intIndex = Math.floor(Math.random() * this.cards.length);
            hand.add(this.cards.splice(intIndex, 1)[0]);  //  Note that Array.splice() returns an array.  In this case, the array has one element.  We're extracting that one element, which is a Card object.
        }
        this.resetCount();
        return hand;
    }
}

/**
 * This function is simply a means of putting in one grid all data from
 * which a deck of cards is constructed.  Note that the boxes in the right-
 * most column are actual Unicode characters that depict playing cards
 * when displayed on a web page with a UTF-8 charset.
 * 
 * @returns {String}
 */
function getSource() {
    var source =
`Ace	Spades	1	14	🂡
2	Spades	2	2	🂢
3	Spades	3	3	🂣
4	Spades	4	4	🂤
5	Spades	5	5	🂥
6	Spades	6	6	🂦
7	Spades	7	7	🂧
8	Spades	8	8	🂨
9	Spades	9	9	🂩
10	Spades	10	10	🂪
Jack	Spades	10	11	🂫
Queen	Spades	10	12	🂭
King	Spades	10	13	🂮
Ace	Hearts	1	14	🂱
2	Hearts	2	2	🂲
3	Hearts	3	3	🂳
4	Hearts	4	4	🂴
5	Hearts	5	5	🂵
6	Hearts	6	6	🂶
7	Hearts	7	7	🂷
8	Hearts	8	8	🂸
9	Hearts	9	9	🂹
10	Hearts	10	10	🂺
Jack	Hearts	10	11	🂻
Queen	Hearts	10	12	🂽
King	Hearts	10	13	🂾
Ace	Clubs	1	14	🃑
2	Clubs	2	2	🃒
3	Clubs	3	3	🃓
4	Clubs	4	4	🃔
5	Clubs	5	5	🃕
6	Clubs	6	6	🃖
7	Clubs	7	7	🃗
8	Clubs	8	8	🃘
9	Clubs	9	9	🃙
10	Clubs	10	10	🃚
Jack	Clubs	10	11	🃛
Queen	Clubs	10	12	🃝
King	Clubs	10	13	🃞
Ace	Diamonds	1	14	🃁
2	Diamonds	2	2	🃂
3	Diamonds	3	3	🃃
4	Diamonds	4	4	🃄
5	Diamonds	5	5	🃅
6	Diamonds	6	6	🃆
7	Diamonds	7	7	🃇
8	Diamonds	8	8	🃈
9	Diamonds	9	9	🃉
10	Diamonds	10	10	🃊
Jack	Diamonds	10	11	🃋
Queen	Diamonds	10	12	🃍
King	Diamonds	10	13	🃎`;
    /*  Note to self:  This is a template literal, and it is new to ECMAScript 6, which was released in June of 2015.
        It is enclosed in back-ticks, rather than quotation marks, and it can contain placeholders.  It is comparable
        to a PHP heredoc.  See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
        for details.  I'm using this template literal here because it is the closest approximation that I know of at
        this moment how to get to reading from a text file in JavaScript.  */
    return source;
}