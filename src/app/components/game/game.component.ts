import { Component, Input, OnInit } from "@angular/core";
import { GameSession } from "../../models/game-session";

@Component({
	selector: "app-game",
	templateUrl: "./game.component.html",
	styleUrls: ["./game.component.scss"]
})
export class GameComponent implements OnInit {

	@Input() game: GameSession;

	constructor() {
	}

	ngOnInit() {
	}

}
