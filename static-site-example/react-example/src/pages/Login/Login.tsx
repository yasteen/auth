import React, { useRef } from "react";
import { kratos } from "../../kratos/kratos";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import {
    useSelfService,
    useUpdateLoginSession,
} from "../../kratos/utils/hooks";
import FormCard from "../../kratos/components/FormCard/FormCard";

const Login = () => {
    const updateLogin = useUpdateLoginSession();
    const navigate = useNavigate();

    const { flowId, csrfToken } = useSelfService(false, "login");

    const card = useRef<React.ElementRef<typeof FormCard>>(null);

    const submit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const values = card.current?.getValues();
        if (!values || !values.identifier || !values.password || !flowId) {
            return;
        }

        await kratos.submitSelfServiceLoginFlow(flowId, {
            ...values,
            method: "password",
            csrf_token: csrfToken,
        });
        await updateLogin();
        navigate("/home");
    };

    return (
        <div className={styles.main}>
            <FormCard
                ref={card}
                submit={submit}
                inputs={[
                    {
                        displayName: "Email",
                        name: "identifier",
                        type: "email",
                    },
                    {
                        displayName: "Password",
                        name: "password",
                        type: "password",
                    },
                ]}
                title={"Login"}
            />
        </div>
    );
};

export default Login;
