import { Session } from "@ory/client";
import { createContext } from "react";

export type LoginSession = false | "loading" | Session;

interface LoginSessionContextType {
    loginSession: LoginSession;
    setLoginSession: (session: LoginSession) => void;
}

export const LoginSessionContext = createContext<LoginSessionContextType>({
    loginSession: false,
    setLoginSession: () => {},
});
