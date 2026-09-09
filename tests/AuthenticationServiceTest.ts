import { AuthenticationService } from "../src/services/AuthenticationService";

async function run() {

    const auth =
        new AuthenticationService();

    const result =
        await auth.login(
            "admin",
            "CHANGE_ME"
        );

    console.log(
        "Login Result:"
    );

    console.log(
        result
    );

    console.log(
        "Authenticated:",
        auth.isAuthenticated()
    );
}

run();