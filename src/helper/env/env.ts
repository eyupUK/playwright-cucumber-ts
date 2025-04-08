import * as dotenv from 'dotenv'

export const getEnv = () => {
    const env = process.env.ENV || "test";
    if (env) {
        dotenv.config({
            override: true,
            path: `src/helper/env/.env.${env}`
        });
        console.log(`Environment: ${env}`);
    } else {
        console.error("NO ENV PASSED!");
    }
    return env;
}
