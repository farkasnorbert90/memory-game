import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class CardService{

	private cards = [
		'angular',
		'd3',
		'jenkins',
		'postcss',
		'react',
		'redux',
		'sass',
		'supercharge',
		'ts',
		'webpack'
	];

	getCards(length) {
		let cards = [];
		for (let j=0; j<2; j++) {
			for (let i=0; i<length; i++) {
				cards.push({
					name: this.cards[i],
					active: false,
					paired: false
				});
			}
		}
		cards = this.shuffle(cards);
		for (let i=0; i<cards.length; i++) {
			cards[i].index = i;
		}
		return cards;
	}

	private shuffle(array) {
		var currentIndex = array.length, temporaryValue, randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	};

}
