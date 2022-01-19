/**
 * gets value from source object using key . for eg : parse req.body.filename from request = (source=req, path ="body.filename")
 * @param source target object
 * @param key string key to get seperated by dots . eg : "body.filename"
 */
export const getValueFromObjectKey = (source: any, key: string) => {
  if (key) {
    const stringArr: string[] = key.split(".");

    let returnedValue = source;

    stringArr.forEach((key) => {
      returnedValue = returnedValue[key];
    });

    return returnedValue;
  } else {
    return source;
  }
};
