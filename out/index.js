"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_ssm_1 = require("@aws-sdk/client-ssm");
const utils_1 = require("./utils");
const awsDotEnv = (config) => {
    (0, utils_1.assertAwsCrendentialsAreSetup)();
    (0, utils_1.assertConfigIsValid)({
        project: config.project,
        environment: config.environment,
    });
    const client = new client_ssm_1.SSMClient({ region: config.region });
    return {
        addParameter: addParameter(client, config),
        load: load(client, config),
    };
};
const load = (client, config) => async () => {
    try {
        const getParametersByPathCommand = new client_ssm_1.GetParametersByPathCommand({
            Path: `/${config.project}/${config.environment}`,
            WithDecryption: true,
        });
        const response = await client.send(getParametersByPathCommand);
        response.Parameters?.forEach((p) => {
            console.log("paaa", p);
            if (p.Name && p.Value) {
                process.env[(0, utils_1.extractParameterName)(p.Name)] = p.Value;
                console.log(`AwsDotEnv:: ${p.Name} loaded`);
            }
        });
    }
    catch (error) {
        console.error(error);
        throw error;
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
        });
        await client.send(putParameterCommand);
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
exports.default = awsDotEnv;
