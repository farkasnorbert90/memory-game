export class StepCount{

	private _count = 0;

	get count() {
		return this._count;
	}

	reset() {
		this._count = 0;
	}

	increase() {
		this._count = this._count+1;
	}

}
