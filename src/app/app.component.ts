import { Component } from "@angular/core";
import { CardService } from "./services/card.service";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/interval";
import "rxjs/add/operator/take";
import { StepCount } from "./models/step-count";
import { Highscore } from "./models/highscore";
import { GameSession } from "./models/game-session";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"]
})
export class AppComponent {

	//game;
	difficulty = 3;
	stepCount = new StepCount();
	highscore = new Highscore();
	cards = [];
	selectedCards = [];
	pending = false;
	ended = false;

	constructor(
		private cardService: CardService
	) {
		//this.game = new GameSession(this.cardService);
	}

	refreshGame() {
		//this.game.newGame(this.difficulty);
		this.ended = false;
		this.stepCount.reset();
		this.cards = this.cardService.getCards(this.difficulty);
	}

	selectCard(card) {
		//this.game.selectCard(card);
		if (card.paired) {
			return false;
		}
		if (this.pending) {
			return false;
		}
		card.selected = !card.selected;
		if (card.selected) {
			this.stepCount.increase();
			this.selectedCards.push(card.index);
		} else {
			const index = this.selectedCards.indexOf(card.index);
			this.selectedCards.splice(index, 1);
		}
		if (this.selectedCards.length === 2) {
			this.pending = true;
			Observable.interval(500)
				.take(1)
				.subscribe(i => {
					this.pending = false;
					if (this.cards[this.selectedCards[0]].name === this.cards[this.selectedCards[1]].name) {
						this.cards[this.selectedCards[0]].paired = true;
						this.cards[this.selectedCards[1]].paired = true;
					}
					this.cards[this.selectedCards[0]].selected = false;
					this.cards[this.selectedCards[1]].selected = false;
					this.selectedCards = [];
					const cardsLeft = this.cards.filter(card => !card.paired).length;
					if (cardsLeft === 0) {
						this.highscore.newScore(this.stepCount.count);
						this.ended = true;
					}
				});
		}
	}
}
