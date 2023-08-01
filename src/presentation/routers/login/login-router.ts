import HttpResponse from "../../helpers/http-response/http-response";

interface HttpRequest {
	body: {
		email: string;
		password: string;
	};
}

export default class LoginRouter {
	authUseCase: any;
	constructor(authUseCase) {
		this.authUseCase = authUseCase;
	}

	route(httpRequest: HttpRequest) {
		if (!httpRequest || !httpRequest.body) {
			return HttpResponse.serverError();
		}
		const { email, password } = httpRequest.body;
		if (!email) {
			return HttpResponse.badRequest("email");
		}
		if (!password) {
			return HttpResponse.badRequest("password");
		}
		this.authUseCase.auth(email, password);
	}
}
