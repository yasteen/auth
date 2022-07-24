import production from "./production.json";
import development from "./development.json";

interface Config {
    server_url: string;
    identity_server_url: string;
}

const config: Config =
    process.env.NODE_ENV === "production"
        ? production
        : process.env.NODE_ENV === "development"
        ? development
        : development;

export default config;
