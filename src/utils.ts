/**
 * Extracts the parameter name
 * @param parameterValue
 */

export const extractParameterName = (parameterValue: string) => {
  const arr = parameterValue.split("/");
  return arr[arr.length - 1];
};

/**
 * Project name and Environment should have only Letters or Numbers. No symbols are allowed
 * @param value
 */
export const assertConfigIsValid = (config: {
  project: string;
  environment: string;
}) => {
  //@todo regex to validate : size, no symbols.
};

/**
 * assert aws crendetials are valid
 */
export const assertAwsCrendentialsAreSetup = () => {
  if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    throw new Error(
      "Please check your settings. AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY must be set up as environment variables"
    );
  }
};
