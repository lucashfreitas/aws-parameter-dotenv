import tap from "tap";
import dotenv from "../src";
import { clearAwsEnvVars, withAwsEnvVars } from "./test.helper";

tap.test("should throw error if no credentials are set up", (t) => {
  t.throws(() => {
    dotenv({
      environment: "test",
      project: "test",
      region: "us-east-1",
    });
  }, {});

  withAwsEnvVars();

  t.doesNotThrow(() => {
    dotenv({
      environment: "test",
      project: "test",
      region: "us-east-1",
    });
  });

  clearAwsEnvVars();

  t.end();
});
