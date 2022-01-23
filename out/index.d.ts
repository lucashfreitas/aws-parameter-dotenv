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
declare const awsDotEnv: (config: ConfigOptions) => {
    addParameter: (params: AddParameterOptions) => Promise<void>;
    load: (params: LoadEnvOptions) => Promise<void>;
};
export default awsDotEnv;
