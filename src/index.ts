import {
  SSMClient,
  GetParametersByPathCommand,
  PutParameterCommand,
  ParameterType,
} from "@aws-sdk/client-ssm";
import {
  assertAwsCrendentialsAreSetup,
  assertConfigIsValid,
  extractParameterName,
} from "./utils";

/**
 * Configuration Option
 */
export interface ConfigOptions {
  project: string; //project name
  environment: string; //environment name, e.g local, stage, production
  region: string; // aws region, e.g us-east-1
}

export type AwsParameterDotEnv = (config: ConfigOptions) => {
  addParameter: (options: AddParameterOptions) => void;
  load: () => void;
};

interface AddParameterOptions {
  /**
   * Parameter name
   */
  name: string;

  /**
   * Parameter Value
   */
  value: string;
  /**
   * Default true. If secure the parameter will be stored as a Secure String.
   */
  secure?: boolean;
}

const awsDotEnv: AwsParameterDotEnv = (config) => {
  assertAwsCrendentialsAreSetup();
  assertConfigIsValid({
    project: config.project,
    environment: config.environment,
  });
  const client = new SSMClient({ region: config.region });

  return {
    addParameter: addParameter(client, config),
    load: load(client, config),
  };
};

const load = (client: SSMClient, config: ConfigOptions) => async () => {
  try {
    const getParametersByPathCommand = new GetParametersByPathCommand({
      Path: `/${config.project}/${config.environment}`,
      WithDecryption: true,
    });
    const response = await client.send(getParametersByPathCommand);
    response.Parameters?.forEach((p) => {
      console.log("paaa", p);
      if (p.Name && p.Value) {
        process.env[extractParameterName(p.Name)] = p.Value;
        console.log(`AwsDotEnv:: ${p.Name} loaded`);
      }
    });
  } catch (error) {
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
const addParameter =
  (client: SSMClient, config: ConfigOptions) =>
  async (params: AddParameterOptions) => {
    try {
      const { name, value, secure } = params;
      const putParameterCommand = new PutParameterCommand({
        Name: `/${config.project}/${config.environment}/${name}`,
        Value: value,
        Overwrite: true,
        Type: secure ? ParameterType.SECURE_STRING : ParameterType.STRING,
      });
      await client.send(putParameterCommand);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

export default awsDotEnv;
