// Copyright (c) <2016> <Oliver Uvman>
// Permissions are granted in accordance with the MIT license: https://opensource.org/licenses/MIT
"use strict";
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
function file_exists(path) {
    // Gee thanks Node Team for considering a non-existent file a fatal error
    // case that must be dealt with using an entirely separate type of control
    // flow.
    try {
        fs.lstatSync(path);
        return true;
    }
    catch (e) {
        return false;
    }
}
function do_load(cfg_env_var, default_fun) {
    if (!_.has(process.env, cfg_env_var)) {
        return default_fun();
    }
    let env_cfg_path = process.env[cfg_env_var];
    let error_base_msg = `Configuration file specified by env var ${cfg_env_var} = ${env_cfg_path}`;
    let overrides = {};
    if (!file_exists(env_cfg_path)) {
        let err_msg = `${error_base_msg} does not exist.`;
        console.error('\n' + err_msg + '\n');
        return null;
    }
    else {
        try {
            overrides = require(path.resolve(env_cfg_path));
        }
        catch (e) {
            let err_msg = `${error_base_msg} could not be loaded.`;
            console.error('\n' + err_msg + '\n');
            console.error(e);
            return null;
        }
    }
    return _.defaultsDeep({}, overrides, default_fun());
}
let memoized_do_load = _.memoize(do_load);
let load = function load(cfg_env_var, default_fun, allow_cache = true) {
    if (allow_cache) {
        return memoized_do_load(cfg_env_var, default_fun);
    }
    return do_load(cfg_env_var, default_fun);
};
exports.load = load;
//# sourceMappingURL=index.js.map