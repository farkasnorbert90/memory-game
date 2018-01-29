export class Highscore{

	private _best: number = null;
	private _count = 0;

	get best() {
		return this._best;
	}

	get ready() {
		return this._count > 0;
	}

	newScore(score: number) {
		if (this._count === 0) {
			this._best = score;
		} else if (this._best > score) {
			this._best = score;
		}
		this._count++;
	}

}
