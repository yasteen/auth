import { Configuration, V0alpha2Api } from "@ory/client";
import config from "../config/config";

export const kratos = new V0alpha2Api(
    new Configuration({
        baseOptions: {
            withCredentials: true,
        },
    }),
    config.identity_server_url
);
