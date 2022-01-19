import * as META_KEYS from "../meta-keys";

// export function reqBody(
//     target: Object,
//     key: string | symbol,
//     parameterIndex: number
//   ) {
//     setParamMetadata(PARAM_TYPE.BODY, target, key, parameterIndex);
//   }

export const createParamDecorator = (path: string) => {
  return (
    target: Object,
    propertyKey: string | symbol,
    parameterIndex: number
  ) => {
    setParameterData(target, propertyKey, parameterIndex, path);
  };
};

const setParameterData = (
  target: Object,
  propertyKey: string | symbol,
  parameterIndex: number,
  path: string
) => {
  /**
   * type will be {
   * [{
   *  path : string.string format,
   * parameterIndex : number
   *
   * }]
   *
   * }
   */
  const listParams = getParameterData(target, propertyKey);

  listParams.push({
    path,
    parameterIndex,
  });

  Reflect.defineMetadata(
    META_KEYS.CUSTOM_PARAMETER_LIST_KEY,
    listParams,
    target,
    propertyKey
  );
};

const getParameterData = (target: Object, propertyKey: string | symbol) => {
  const listParams = Reflect.getOwnMetadata(
    META_KEYS.CUSTOM_PARAMETER_LIST_KEY,
    target,
    propertyKey
  );

  if (Array.isArray(listParams)) {
    return listParams;
  } else {
    return [];
  }
};
