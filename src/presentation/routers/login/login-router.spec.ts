import { describe, expect, test } from "vitest";
import { MissingParamError, InternalServerError } from "../../errors";
import LoginRouter from "./login-router";

const makeSut = () => {
	class AuthUseCaseSpy {
		email: string;
		password: string;
		auth(email: string, password: string) {
			this.email = email;
			this.password = password;
		}
	}
	const authUseCaseSpy = new AuthUseCaseSpy();
	const sut = new LoginRouter(authUseCaseSpy);
	return { sut, authUseCaseSpy };
};

describe("login router", () => {
	test("should return 400 with no email is provided", () => {
		const { sut } = makeSut();
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
		const { sut } = makeSut();
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
		const { sut } = makeSut();
		const httpResponse = sut.route(undefined);
		expect(httpResponse.statusCode).toBe(500);
		expect(httpResponse.body).toEqual(new InternalServerError());
	});

	test("should return 500 if httpRequest has no body", () => {
		const { sut } = makeSut();
		const httpRequest = {
			body: undefined,
		};
		const httpResponse = sut.route(httpRequest);
		expect(httpResponse.statusCode).toBe(500);
		expect(httpResponse.body).toEqual(new InternalServerError());
	});

	test("should calls AuthUseCase with correct params", () => {
		const { sut, authUseCaseSpy } = makeSut();
		const httpRequest = {
			body: {
				email: "any_email@email.com",
				password: "any_password",
			},
		};
		sut.route(httpRequest);
		expect(authUseCaseSpy.email).toBe(httpRequest.body.email);
		expect(authUseCaseSpy.password).toBe(httpRequest.body.password);
	});
});
