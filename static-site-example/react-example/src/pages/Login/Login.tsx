import { useEffect, useRef, useState } from "react";
import Card from "../../components/Card/Card";
import { kratos } from "../../kratos/kratos";
import styles from "./Login.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUpdateLoginSession } from "../../utils/hooks";

const Login = () => {
    const updateLogin = useUpdateLoginSession();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);

    const [csrf_token, setCsrf_token] = useState("");

    useEffect(() => {
        (async () => {
            const flowId = searchParams.get("flowId");
            if (flowId) {
                try {
                    const response = await kratos.getSelfServiceLoginFlow(
                        flowId
                    );
                    // @ts-ignore
                    setCsrf_token(response.data.ui.nodes[0].attributes?.value);
                    return;
                } catch (e) {
                    console.log("Login flow expired", e);
                }
            }
            const response =
                await kratos.initializeSelfServiceLoginFlowForBrowsers();
            setSearchParams({ flowId: response.data.id });
        })();
    }, [searchParams, setSearchParams]);

    const submit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const flowId = searchParams.get("flowId");
        if (!email.current || !password.current || !flowId) {
            return;
        }

        await kratos.submitSelfServiceLoginFlow(flowId, {
            identifier: email.current.value,
            password: password.current.value,
            method: "password",
            csrf_token: csrf_token,
        });
        await updateLogin();
        navigate("/home");
    };

    return (
        <div className={styles.main}>
            <Card>
                <div>
                    <h2 className={styles.title}>Login</h2>
                    <form className={styles.login_form}>
                        <>
                            <div className={styles.email}>Email</div>
                            <input
                                className={styles.efield}
                                type="email"
                                name="email"
                                ref={email}
                            />
                        </>
                        <>
                            <div className={styles.psswd}>Password</div>
                            <input
                                className={styles.pfield}
                                type="password"
                                name="password"
                                ref={password}
                            />
                        </>
                        <button
                            className={styles.submit}
                            type="submit"
                            onClick={submit}
                            // onSubmit={submit}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </Card>
        </div>
    );
};

export default Login;
