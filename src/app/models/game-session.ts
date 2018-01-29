import { CardService } from "../services/card.service";
import { Observable } from "rxjs/Observable";
import { StepCount } from "./step-count";
import { Highscore } from "./highscore";

export class GameSession{

	stepCount = new StepCount();
	highscore = new Highscore();
	private _started = false;
	private _ended = true;
	private _cards = [];
	private _selectedCards = [];
	private _pending = false;


	get cards() {
		return this._cards;
	}

	get ended() {
		return this.ended;
	}

	get pending() {
		return this._pending;
	}

	constructor(
		private cardService: CardService
	) {	}

	newGame(difficulty) {
		this._started = true;
		this._ended = false;
		this._cards = this.cardService.getCards(difficulty);
	}

	selectCard(card) {
		if (card.paired) {
			return false;
		}
		if (this._pending) {
			return false;
		}
		//const index = card.index;
		//this._cards[index].selected = !this._cards[index].selected;
		card.selected = !card.selected;
		if (card.selected) {
			this.stepCount.increase();
			this._selectedCards.push(card.index);
		} else {
			const index = this._selectedCards.indexOf(card.index);
			this._selectedCards.splice(index, 1);
		}
		if (this._selectedCards.length === 2) {
			this._pending = true;
			Observable.interval(500)
				.take(1)
				.subscribe(i => {
					this._pending = false;
					if (this._cards[this._selectedCards[0]].name === this.cards[this._selectedCards[1]].name) {
						this._cards[this._selectedCards[0]].paired = true;
						this._cards[this._selectedCards[1]].paired = true;
					}
					this._cards[this._selectedCards[0]].selected = false;
					this._cards[this._selectedCards[1]].selected = false;
					this._selectedCards = [];
					let cardsLeft = this.cards.filter(card => !card.paired).length;
					if (cardsLeft === 0) {
						this.highscore.newScore(this.stepCount.count);
						this._ended = true;
					}
				});
		}
	}

}
