/*

Homework #2 - Pig Latin

Peter Caliandro
WEB 150
Winter 2018
January 18, 2017

script.js

*/
function processPhrase(english)
/*  Translate a string of multiple words from English to Pig Latin.
	Characters other than a - z and A - Z are used as delimiters between words and are not translated.
	Strings of characters between delimiting, non-translatable characters are sent to another function for translation.
*/
{
	var phrase = '';  //  Translation from english.  To be built one character or word at a time.
	var wordStart = -1;  //  Character position of start of word.  -1 indicates that no word is currently in process.
	var wordLength = 0;
	
	for (var pos = 0; pos < english.length; pos++) {
		if ('a' <= english.charAt(pos).toLowerCase() && english.charAt(pos).toLowerCase() <= 'z') {  //  We're somewhere in a word.
			if (wordStart == -1) {  //  We're at the start of a new word.
				wordStart = pos;  //  Mark the start of the word.
				wordLength = 1;  //  This word is at least one character long so far.
			} else {  //  We're still somewhere in a word.
				wordLength++  //  Increment the length of the word.
			}
		} else {  //  We're in punctuation, whitespace, or a number.  
			if (0 < wordLength) {  //  We're at the first character after the end of the latest word.
				phrase += translateWord(english.substr(wordStart, wordLength));  //  Translate the latest word and append it to the translation.
			}
			phrase += english.charAt(pos);  //  Pass this character to the translation as is.
			wordStart = -1;  //  Indicate that we're not in a word at present.
			wordLength = 0;
		}	
	}
	if (0 < wordLength) {  //  We're at the end of the phrase, and the phrase ends with a word, rather than punctuation or anything else.
		phrase += translateWord(english.substr(wordStart, wordLength));  //  Translate the latest word and append it to the translation.
	}
	return phrase;
	}

function translateWord(english)
/*  Translate a word from English to Pig Latin using the following rules:
	1.  If a word contains only one letter, it will not get translated.
	2.  If a word begins with a vowel, the letter remains in place and 'way' is appended to the end of the word.  Note that the letter 'y' is treated here as a vowel in every case.
	3.  If a word begins with one consonant, that letter is moved to the end and 'ay' is appended.
	4.  If a word begins with two consonants, both letters are moved to the end and 'ay' is appended.
*/
{
	var word = '';
	
	if (english.length <= 1) {  //  1.  One-letter words don't get translated.
		word  =  english;
	} else if (isVowel(english.charAt(0))) {  //  2.  Word starts with a vowel.
		if (english.toUpperCase() == english) {  //  Word is spelled in ALL CAPITALS.
			word  =  english + 'WAY';
		} else {
			word  =  english + 'way';
		}
	} else if (isVowel(english.charAt(1))) {  //  3.  Word starts with one consonant.
		if (english.toUpperCase() == english) {  //  Word is spelled in ALL CAPITALS.
			word  =  english.slice(1) + english.charAt(0) + 'AY';
		} else if (english.charAt(0).toUpperCase() == english.charAt(0)) {  //  Word is Capitalized, more or less . . . .
			word  =  english.charAt(1).toUpperCase() + english.slice(2) + english.charAt(0).toLowerCase() + 'ay';
		} else {  //  Word is lowercase, more or less . . . .
			word  =  english.slice(1) + english.charAt(0) + 'ay';
		}
	} else {  //  4.  Word starts with two or more consonants.
		if (english.toUpperCase() == english) {  //  Word is spelled in ALL CAPITALS.
			word  =  english.slice(2) + english.charAt(0) + english.charAt(1) + 'AY';
		} else if (english.charAt(0).toUpperCase() == english.charAt(0)) {  //  Word is Capitalized, more or less . . . .
			word  =  english.charAt(2).toUpperCase() + english.slice(3) + english.charAt(0).toLowerCase() + english.charAt(1).toLowerCase() + 'ay';
		} else {  //  Word is lowercase, more or less . . . .
			word  =  english.slice(2) + english.charAt(0) + english.charAt(1) + 'ay';
		}
	}				
	return word;
}

function isVowel(character)
{  //  Return a boolean value indicating whether the first character of a string is a vowel.
	switch (character.charAt(0).toLowerCase()) {
		case 'a':
		case 'e':
		case 'i':
		case 'o':
		case 'u':
		case 'y':
			return true;
			break;
		default:
			return false;
			break;
	}
}
