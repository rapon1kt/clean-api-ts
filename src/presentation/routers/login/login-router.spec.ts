import { describe, expect, test } from "vitest";

interface HttpRequest {
	body: {
		email: string;
		password: string;
	};
}

class LoginRouter {
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
	}
}

class HttpResponse {
	static badRequest(paramName: string) {
		return {
			statusCode: 400,
			body: new MissingParamError(paramName),
		};
	}

	static serverError() {
		return {
			statusCode: 500,
		};
	}
}

class MissingParamError extends Error {
	constructor(paramName: string) {
		super(`Missing param: ${paramName}`);
		this.name = "MissingParamError";
	}
}

describe("login router", () => {
	test("should return 400 with no email is provided", () => {
		const sut = new LoginRouter();
		const httpRequest = {
			body: {
				password: "any_password",
				email: undefined,
			},
		};
		const httpResponse = sut.route(httpRequest);
		expect(httpResponse.statusCode).toBe(400);
		expect(httpResponse.body).toEqual(new MissingParamError("email"));
	});

	test("should return 400 with no password is provided", () => {
		const sut = new LoginRouter();
		const httpRequest = {
			body: {
				password: undefined,
				email: "any_email@email.com",
			},
		};
		const httpResponse = sut.route(httpRequest);
		expect(httpResponse.statusCode).toBe(400);
		expect(httpResponse.body).toEqual(new MissingParamError("password"));
	});

	test("should return 500 if no httpRequest is provided", () => {
		const sut = new LoginRouter();
		const httpResponse = sut.route(undefined);
		expect(httpResponse.statusCode).toBe(500);
	});

	test("should return 500 if httpRequest has no body", () => {
		const sut = new LoginRouter();
		const httpRequest = {
			body: undefined,
		};
		const httpResponse = sut.route(httpRequest);
		expect(httpResponse.statusCode).toBe(500);
	});
});
