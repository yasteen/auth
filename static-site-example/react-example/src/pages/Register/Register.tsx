import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import FormCard from "../../kratos/components/FormCard/FormCard";
import { kratos } from "../../kratos/kratos";
import {
    useSelfService,
    useUpdateLoginSession,
} from "../../kratos/utils/hooks";
import styles from "./Register.module.css";

const Register = () => {
    const updateLogin = useUpdateLoginSession();
    const navigate = useNavigate();

    const { flowId, csrfToken } = useSelfService(false, "registration");

    const card = useRef<React.ElementRef<typeof FormCard>>(null);

    const submit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const values = card.current?.getValues();
        if (
            !values ||
            !values.password ||
            !values["traits.email"] ||
            !values["traits.name.first"] ||
            !values["traits.name.last"] ||
            !flowId
        ) {
            return;
        }

        await kratos.submitSelfServiceRegistrationFlow(flowId, {
            provider: "",
            traits: {
                email: values["traits.email"],
                name: {
                    first: values["traits.name.first"],
                    last: values["traits.name.last"],
                },
            },
            password: values.password,
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
                        name: "traits.email",
                        type: "email",
                    },
                    {
                        displayName: "Password",
                        name: "password",
                        type: "password",
                    },
                    {
                        displayName: "First Name",
                        name: "traits.name.first",
                        type: "text",
                    },
                    {
                        displayName: "Last Name",
                        name: "traits.name.last",
                        type: "text",
                    },
                ]}
                title={"Register"}
            />
        </div>
    );
};

export default Register;
