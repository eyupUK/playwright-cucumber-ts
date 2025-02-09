import * as dotenv from 'dotenv'

export const getEnv = () => {
    const env = process.env.ENV || "staging";
    if (process.env.ENV) {
        dotenv.config({
            override: true,
            path: `src/helper/env/.env.${process.env.ENV}`
        });
        console.log(`Environment: ${process.env.ENV}`);
    } else {
        console.error("NO ENV PASSED!");
    }
    return env;
}
