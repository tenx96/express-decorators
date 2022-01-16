export enum HTTP_METHOD {
    GET="get",
    POST="post",
    PATCH="patch",
    DELETE="delete"
}



export const REQUEST_PATH_KEY = "req_path"
export const REQUEST_METHOD_KEY = "req_method"
export const TARGET_KEY = "target_key"
export const MIDDLEWARE_KEY = "middleware"
export const ERROR_MIDDLEWARE_KEY = "error_middleware"

// CONTROLLERS
export const ROUTER_URL_KEY = "router_url"

// validator keys
export const VALID_SCHEMA_KEY = "valid_schema_key"
export const VALID_OPTIONS_KEY = "valid_options_key"


// PARAMS
export enum PARAM_TYPE {
    BODY,
    QUERY,
    PARAMS,
    FILE,
    FILES
}