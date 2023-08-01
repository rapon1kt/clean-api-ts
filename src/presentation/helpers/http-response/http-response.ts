import MissingParamError from "../../errors/missing-param-error/missing-param-error";
import InternalServerError from "../../errors/internal-server-error/internal-server-error";

export default class HttpResponse {
	static badRequest(paramName: string) {
		return {
			statusCode: 400,
			body: new MissingParamError(paramName),
		};
	}

	static serverError() {
		return {
			statusCode: 500,
			body: new InternalServerError(),
		};
	}
}
