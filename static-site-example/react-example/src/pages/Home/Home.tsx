import RequireSignIn from "../../kratos/components/RequireSignedIn/RequireSignIn";

const Home = () => {
    return <RequireSignIn>Ok</RequireSignIn>;
};

export default Home;
