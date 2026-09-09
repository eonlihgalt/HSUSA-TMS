import { AuthenticationService } from "./AuthenticationService";

async function run() {

    const auth =
        new AuthenticationService();

    const result =
        await auth.login(
            "admin",
            "CHANGE_ME"
        );

    console.log(result);

    console.log(
        auth.isAuthenticated()
    );
}

run();