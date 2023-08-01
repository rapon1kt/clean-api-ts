export default class InternalServerError extends Error {
	constructor() {
		super(`Server Error`);
		this.name = "InternalServerError";
	}
}
