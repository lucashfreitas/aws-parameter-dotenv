"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_ssm_1 = require("@aws-sdk/client-ssm");
const checkAwsCredentials = () => {
    if (!process.env.AWS_ACCESS_KEY_ID) {
        throw new Error("AWS_ACCESS_KEY_ID must be set as an environment variable");
    }
    if (!process.env.AWS_SECRET_ACCESS_KEY) {
        throw new Error("AWS_SECRET_ACCESS_KEY must be set as an environment variable");
    }
};
const awsDotEnv = (config) => {
    checkAwsCredentials();
    const client = new client_ssm_1.SSMClient({ region: config.region });
    return {
        addParameter: addParameter(client, config),
        load: load(client, config),
    };
};
const load = (client, config) => async (params) => {
    try {
        const getParametersByPathCommand = new client_ssm_1.GetParametersByPathCommand({
            Path: `/${params.project}/${params.env}`,
            WithDecryption: true,
        });
        const response = await client.send(getParametersByPathCommand);
        response.Parameters?.forEach((p) => {
            if (p.Name && p.Value)
                process.env[p.Name] = p.Value;
        });
    }
    catch (error) {
        console.error(error);
    }
};
/**
 * Adds a parameter to the store
 * @param client
 * @param config
 * @returns
 */
const addParameter = (client, config) => async (params) => {
    try {
        const { name, value, secure } = params;
        const putParameterCommand = new client_ssm_1.PutParameterCommand({
            Name: `/${config.project}/${config.environment}/${name}`,
            Value: value,
            Overwrite: true,
            Type: secure ? client_ssm_1.ParameterType.SECURE_STRING : client_ssm_1.ParameterType.STRING,
            Tags: [
                {
                    Key: "env",
                    Value: `${config.project}/${config.environment}`,
                },
            ],
        });
        const response = await client.send(putParameterCommand);
        console.log("Parameter Sucessfuly added");
    }
    catch (error) {
        console.error(error);
    }
};
exports.default = awsDotEnv;
