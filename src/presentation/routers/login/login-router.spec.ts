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
			return {
				statusCode: 500,
			};
		}
		const { email, password } = httpRequest.body;
		if (!email || !password) {
			return {
				statusCode: 400,
			};
		}
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
