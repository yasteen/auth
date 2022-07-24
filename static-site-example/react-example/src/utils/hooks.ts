import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LoginSessionContext } from "../context/loginSessionContext";
import { kratos } from "../kratos/kratos";
import { getLoginSession } from "./helpers";

export const useUpdateLoginSession = () => {
    const { setLoginSession } = useContext(LoginSessionContext);
    return async () => {
        setLoginSession(await getLoginSession());
    };
};

type SelfServiceFlowType =
    | "login"
    | "registration"
    | "settings"
    | "verification"
    | "recovery";

export const useSelfService = (
    shouldBeLoggedIn: boolean,
    type: SelfServiceFlowType
) => {
    const navigate = useNavigate();
    const { loginSession } = useContext(LoginSessionContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const [csrfToken, setCsrfToken] = useState("");

    useEffect(() => {
        const isLoggedIn = !!loginSession;
        if (loginSession !== "loading" && shouldBeLoggedIn !== isLoggedIn) {
            navigate(isLoggedIn ? "/home" : "/");
            return;
        }
    }, [loginSession, navigate, shouldBeLoggedIn]);

    useEffect(() => {
        (async () => {
            const flowId = searchParams.get("flowId");
            if (flowId) {
                try {
                    // const response = await SelfServiceFlows[type].get(flowId);
                    const response = await getSelfServiceFlow(type, flowId);
                    // @ts-ignore
                    setCsrfToken(response.data.ui.nodes[0].attributes?.value);
                    return;
                } catch (e) {
                    console.error(`${type} flow expired`, e);
                }
            }
            const response = await initializeSelfServiceFlowForBrowsers(type);
            setSearchParams({ flowId: response.data.id });
        })();
    }, [searchParams, setSearchParams, shouldBeLoggedIn, type]);

    return {
        csrfToken,
        flowId: searchParams.get("flowId"),
    };
};

const getSelfServiceFlow = (type: SelfServiceFlowType, flowId: string) => {
    switch (type) {
        case "login":
            return kratos.getSelfServiceLoginFlow(flowId);
        case "registration":
            return kratos.getSelfServiceRegistrationFlow(flowId);
        case "settings":
            return kratos.getSelfServiceSettingsFlow(flowId);
        case "verification":
            return kratos.getSelfServiceVerificationFlow(flowId);
        case "recovery":
            return kratos.getSelfServiceRecoveryFlow(flowId);
    }
};

const initializeSelfServiceFlowForBrowsers = (type: SelfServiceFlowType) => {
    switch (type) {
        case "login":
            return kratos.initializeSelfServiceLoginFlowForBrowsers();
        case "registration":
            return kratos.initializeSelfServiceRegistrationFlowForBrowsers();
        case "settings":
            return kratos.initializeSelfServiceSettingsFlowForBrowsers();
        case "verification":
            return kratos.initializeSelfServiceVerificationFlowForBrowsers();
        case "recovery":
            return kratos.initializeSelfServiceRecoveryFlowForBrowsers();
    }
};
