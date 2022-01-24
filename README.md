# aws-parameter-dotenv

Tiny Library/wrapper around AWS System Parameter Store to load environment variables directly from AWS.

# Use

`yarn add aws-parameter-dotenv` or `npm i aws-parameter-dotenv`.

This library is very opinated on how to name/structure the parameter names following this
structure: `{projectName}/{environmentName}/{parameterName}`. The parameterName should be **camelCase**.

- You can use the library to add parameters as follow:

```typescript
import awsparamterdotenv from "aws-parameter-dot-env";

/**
 * Add environment variables
 * */

await awsparamterdotenv({
  project: "projectName",
  environment: "environment",
  region: "us-east-1",
}).addParameter({
  name: "myParameter",
  value: "myValue",
  secret: true, // should be stored as secure string
});
```

- Or just load the parameters

```typescript
import awsparamterdotenv from "aws-parameter-dot-env";

/**
 * Load all the environment variables
 * */

await awsparamterdotenv({
  project: "projectName",
  environment: "environment",
  region: "us-east-1",
}).load();

process.env.myParameter === "myValue"; // is TRUE
```

# Testing

- `index.unit.spec.ts` contains the unit tests
- `index.integration.spec.ts` contains the integration tests: It's required valid AWS Credentials accounts with IAM permission to execute operations on SMS. To run the integration tests rename the `.env.example` to `.env` and add your AWS Credentials.
