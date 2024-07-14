import Joi from 'joi';

import { config as dotenvConfig } from 'dotenv';
dotenvConfig({
    path: ['.env.local', '.env']
});


// define validation for all the env vars
const envVarsSchema = Joi.object({
    NODE_ENV: Joi.string()
        .allow('development', 'production', 'test', 'provision')
        .default(process.env.NODE_ENV),
    SERVER_PORT: Joi.number().default(process.env.SERVER_PORT),
    // MONGOOSE_DEBUG: Joi.boolean().when('NODE_ENV', {
    //     is: Joi.string().equal('development'),
    //     then: Joi.boolean().default(true),
    //     otherwise: Joi.boolean().default(false),
    // }),
    JWT_SECRET: Joi.string().default(process.env.JWT_SECRET)
        .required()
        .description('JWT Secret required to sign'),
    DB_CONN_STRING: Joi.string().default(process.env.DB_CONN_STRING),
    DB_NAME: Joi.string().default(process.env.DB_NAME)
})
    .unknown()
    .required();

const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const config = {
    env: envVars.NODE_ENV,
    port: envVars.SERVER_PORT,
    // mongooseDebug: envVars.MONGOOSE_DEBUG,
    jwtSecret: envVars.JWT_SECRET,
    dbConnString: envVars.DB_CONN_STRING,
    dbName: envVars.DB_NAME,
};

export default config;
