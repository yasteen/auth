import { Session } from "@ory/client";
import { kratos } from "../kratos";

/**
 *
 * @returns Returns login session if logged in, otherwise returns false.
 */
export const getLoginSession = async () => {
    try {
        const response = await kratos.toSession();
        return response.data;
    } catch (e) {
        return false;
    }
};

export const kratosLogout = async (
    setLoginSession: (session: false | Session) => void
) => {
    const logout = (await kratos.createSelfServiceLogoutFlowUrlForBrowsers())
        .data;
    await kratos.submitSelfServiceLogoutFlow(logout.logout_token);

    setLoginSession(await getLoginSession());
};
