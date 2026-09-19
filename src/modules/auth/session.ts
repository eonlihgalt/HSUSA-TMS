import { useState } from "react";

export interface AppSession {
    userId: string | null;
    username: string | null;
    loggedIn: boolean;
}

export function defaultSession(): AppSession {
    return {
        userId: null,
        username: null,
        loggedIn: false
    };
}
