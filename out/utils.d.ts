/**
 * Extracts the parameter name
 * @param parameterValue
 */
export declare const extractParameterName: (parameterValue: string) => string;
/**
 * Project name and Environment should have only Letters or Numbers. No symbols are allowed
 * @param value
 */
export declare const assertConfigIsValid: (config: {
    project: string;
    environment: string;
}) => void;
/**
 * assert aws crendetials are valid
 */
export declare const assertAwsCrendentialsAreSetup: () => void;
