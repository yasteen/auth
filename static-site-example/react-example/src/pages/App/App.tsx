import {
    Link,
    BrowserRouter,
    Routes,
    Route,
    useNavigate,
} from "react-router-dom";
import styles from "./App.module.css";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Home from "../Home/Home";
import { getLoginSession, kratosLogout } from "../../utils/helpers";
import { useContext, useEffect, useState } from "react";
import {
    LoginSession,
    LoginSessionContext,
} from "../../context/loginSessionContext";

interface AppRoute {
    path: string;
    name: string;
    element: JSX.Element;
    inNav: boolean;
}

function App() {
    const [loginSession, setLoginSession] = useState<LoginSession>("loading");

    useEffect(() => {
        (async () => setLoginSession(await getLoginSession()))();
    }, []);

    const appRoutes: AppRoute[] = [
        {
            path: "/",
            name: "Main",
            element: <Main />,
            inNav: true,
        },
        {
            path: "/register",
            name: "Register",
            element: <Register />,
            inNav: true,
        },
        {
            path: "/login",
            name: "Login",
            element: <Login />,
            inNav: true,
        },
        {
            path: "/home",
            name: "Home",
            element: <Home />,
            inNav: false,
        },
    ];

    return (
        <div className={styles.app}>
            <BrowserRouter>
                <LoginSessionContext.Provider
                    value={{ loginSession, setLoginSession }}
                >
                    <div className={styles.top_bar}>
                        <nav className={styles.nav}>
                            {appRoutes
                                .filter((route) => route.inNav)
                                .map((route) => (
                                    <Link
                                        to={route.path}
                                        className={styles.app_link}
                                        key={route.name}
                                    >
                                        {route.name}
                                    </Link>
                                ))}
                        </nav>
                        <LogoutButton />
                    </div>
                    <Routes>
                        {appRoutes.map((route) => (
                            <Route
                                path={route.path}
                                element={route.element}
                                key={route.name}
                            />
                        ))}
                    </Routes>
                </LoginSessionContext.Provider>
            </BrowserRouter>
        </div>
    );
}

const LogoutButton = () => {
    const { loginSession, setLoginSession } = useContext(LoginSessionContext);
    const navigate = useNavigate();
    return loginSession === "loading" || loginSession === false ? (
        <></>
    ) : (
        <button
            className={styles.logout}
            onClick={async () => {
                await kratosLogout(setLoginSession);
                navigate("/");
            }}
        >
            Logout
        </button>
    );
};

const Main = () => <div style={{ color: "white" }}> Main page </div>;

export default App;
