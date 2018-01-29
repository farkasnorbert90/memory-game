import { Component } from "@angular/core";
import { CardService } from "./services/card.service";
import { GameSession } from "./models/game-session";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"]
})
export class AppComponent {

	game;
	difficulty = 3;

	constructor(
		private cardService: CardService
	) {
		this.game = new GameSession(this.cardService);
	}

	refreshGame() {
		this.game.newGame(this.difficulty);
	}
}
