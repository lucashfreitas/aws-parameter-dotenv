"use strict";
/**
 * Extracts the parameter name
 * @param parameterValue
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertAwsCrendentialsAreSetup = exports.assertConfigIsValid = exports.extractParameterName = void 0;
const extractParameterName = (parameterValue) => {
    const arr = parameterValue.split("/");
    return arr[arr.length - 1];
};
exports.extractParameterName = extractParameterName;
/**
 * Project name and Environment should have only Letters or Numbers. No symbols are allowed
 * @param value
 */
const assertConfigIsValid = (config) => {
    //@todo regex to validate : size, no symbols.
};
exports.assertConfigIsValid = assertConfigIsValid;
/**
 * assert aws crendetials are valid
 */
const assertAwsCrendentialsAreSetup = () => {
    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
        throw new Error("Please check your settings. AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY must be set up as environment variables");
    }
};
exports.assertAwsCrendentialsAreSetup = assertAwsCrendentialsAreSetup;
