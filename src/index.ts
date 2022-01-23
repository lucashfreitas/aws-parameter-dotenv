import {
  SSMClient,
  GetParametersByPathCommand,
  PutParameterCommand,
  ParameterType,
} from "@aws-sdk/client-ssm";

interface ConfigOptions {
  project: string;
  environment: string;
  region: string;
}

interface LoadEnvOptions {
  /**
   * Project name
   */
  project: string;

  /**
   * Environment name
   */
  env: string;
}

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

const checkAwsCredentials = () => {
  if (!process.env.AWS_ACCESS_KEY_ID) {
    throw new Error("AWS_ACCESS_KEY_ID must be set as an environment variable");
  }

  if (!process.env.AWS_SECRET_ACCESS_KEY) {
    throw new Error(
      "AWS_SECRET_ACCESS_KEY must be set as an environment variable"
    );
  }
};

const awsDotEnv = (config: ConfigOptions) => {
  checkAwsCredentials();
  const client = new SSMClient({ region: config.region });

  return {
    addParameter: addParameter(client, config),
    load: load(client, config),
  };
};

const load =
  (client: SSMClient, config: ConfigOptions) =>
  async (params: LoadEnvOptions) => {
    try {
      const getParametersByPathCommand = new GetParametersByPathCommand({
        Path: `/${params.project}/${params.env}`,
        WithDecryption: true,
      });
      const response = await client.send(getParametersByPathCommand);
      response.Parameters?.forEach((p) => {
        if (p.Name && p.Value) process.env[p.Name] = p.Value;
      });
    } catch (error) {
      console.error(error);
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
        Tags: [
          {
            Key: "env",
            Value: `${config.project}/${config.environment}`,
          },
        ],
      });
      const response = await client.send(putParameterCommand);
      console.log("Parameter Sucessfuly added");
    } catch (error) {
      console.error(error);
    }
  };

export default awsDotEnv;
