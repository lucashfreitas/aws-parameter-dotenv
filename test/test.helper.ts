import { ConfigOptions } from "../src";

export const testConfig: ConfigOptions = {
  project: "projectTest",
  environment: "envTest",
  region: "us-east-1",
};

export const clearAwsEnvVars = () => {
  delete process.env["AWS_ACCESS_KEY_ID"];
  delete process.env["AWS_SECRET_ACCESS_KEY"];
};

export const withAwsEnvVars = () => {
  process.env["AWS_ACCESS_KEY_ID"] = "AccessKey";
  process.env["AWS_SECRET_ACCESS_KEY"] = "SecretKey";
};
