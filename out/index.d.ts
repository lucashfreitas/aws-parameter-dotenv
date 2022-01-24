/**
 * Configuration Option
 */
export interface ConfigOptions {
    project: string;
    environment: string;
    region: string;
}
export declare type AwsParameterDotEnv = (config: ConfigOptions) => {
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
declare const awsDotEnv: AwsParameterDotEnv;
export default awsDotEnv;
