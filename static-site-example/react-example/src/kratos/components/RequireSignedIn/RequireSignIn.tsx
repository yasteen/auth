import { PropsWithChildren, useContext } from "react";
import { Navigate } from "react-router-dom";
import { LoginSessionContext } from "../../context/loginSessionContext";

const RequireSignIn = ({ children }: PropsWithChildren) => {
    const { loginSession } = useContext(LoginSessionContext);

    return loginSession === "loading" ? (
        <div>Loading...</div>
    ) : loginSession === false ? (
        <Navigate to="/login" replace />
    ) : (
        <>{children}</>
    );
};

export default RequireSignIn;
