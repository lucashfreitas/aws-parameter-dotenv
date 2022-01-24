import tap from "tap";
import awsparameterdotenv, { AwsParameterDotEnv } from "../src";

import dotenv from "dotenv";
import { testConfig } from "./test.helper";
import path from "path";

/**
 * @todo
 * clear down paramters created
 */

tap.teardown(() => {});
tap.before(() => {});

const parametersFixtures = [
  {
    name: "parameterA",
    value: "foo",
  },
  {
    name: "parameterB",
    value: "bar",
  },
];

dotenv.config({ path: path.resolve(__dirname, "../.env") });

if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
  tap.pass(
    "No Integration tests to run. AWS Environment variables must be setup"
  );
  process.exit();
}

tap.test("should add parameters", (t) => {
  for (const p of parametersFixtures) {
    t.doesNotThrow(async () => {
      await awsparameterdotenv(testConfig).addParameter(p);
    });
  }

  t.end();
});

tap.test("should load parameters", async (t) => {
  await awsparameterdotenv(testConfig).load();
  for (const p of parametersFixtures) {
    t.equal(process.env[p.name], p.value);
  }

  t.end();
});
