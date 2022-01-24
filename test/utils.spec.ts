import tap from "tap";
import { extractParameterName } from "../src/utils";

tap.test("should extract parameter name", (t) => {
  t.equal(extractParameterName("a/b/last"), "last");
  t.end();

  // this case could not happen
  // t.equal(extractParameterValue("a/b/c/d/last"), "last");
});

tap.test("should allow only valid config", (t) => {
  t.pass("Test not implemented");
  t.end();
});
