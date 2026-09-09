import {
    LoginRequest,
    LoginResponse
}
from "./types";

export class LoginService {

    async login(
        request: LoginRequest
    ): Promise<LoginResponse> {

        const result =
            await window.hsusa.login(

                request.username,

                request.password
            );

        return result;
    }
}