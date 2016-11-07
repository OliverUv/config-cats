// Copyright (c) <2016> <Oliver Uvman>
// Permissions are granted in accordance with the MIT license: https://opensource.org/licenses/MIT

import * as fs from 'fs';
import * as path from 'path';
import * as _ from 'lodash';

function file_exists(path:string):boolean {
  // Gee thanks Node Team for considering a non-existent file a fatal error
  // case that must be dealt with using an entirely separate type of control
  // flow.
  try {
    fs.lstatSync(path);
    return true;
  } catch (e) {
    return false;
  }
}

function do_load<CfgType>(
    cfg_env_var:string,
    default_fun:() => CfgType):CfgType|null {

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
  } else {
    try {
      overrides = require(path.resolve(env_cfg_path));
    } catch (e) {
      let err_msg = `${error_base_msg} could not be loaded.`;
      console.error('\n' + err_msg + '\n');
      console.error(e);
      return null;
    }
  }

  return <CfgType>_.defaultsDeep({}, overrides, default_fun());
}

let memoized_do_load = _.memoize(do_load);

export function load<CfgType>(
    cfg_env_var:string,
    default_fun:() => CfgType,
    allow_cache = true):CfgType|null {

    if (allow_cache) {
      return memoized_do_load(cfg_env_var, default_fun);
    }
    return do_load(cfg_env_var, default_fun);
}
