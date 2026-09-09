import {
    LoginRequest,
    LoginResponse
}
from "./types";

export class LoginService {

    async login(
        request: LoginRequest
    ): Promise<LoginResponse> {

//      //
//      // TEMPORARY MOCK
//      //
//      // Replace during IPC-001
//      // when AuthenticationService is exposed
//      // through Electron IPC.
//      //   request: LoginRequest
//  ): Promise<LoginResponse> {
//
//     const result =
//          await authenticationService.login(
//              request.username,
//              request.password
//          );
//
//      return {
//          success: result.success,
//          message: result.message
//      };
//      //

        return {
            success: true,
            message: "Login successful"
        };
    }
}