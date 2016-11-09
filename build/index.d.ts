interface LoadFunction {
    <CfgType>(cfg_env_var: string, default_fun: () => CfgType, allow_cache?: boolean): CfgType | null;
}
declare let load: LoadFunction;
export { LoadFunction, load };
