export function get() {
  const parameters = process.argv;
  const formattedParams = {};

  parameters.forEach((param) => {
    if (param.includes('=')) {
      var [ paramName, paramValue ] = param.split('=');
      formattedParams[paramName] = paramValue;
    }
  });

  return formattedParams;
}

export function parametersToList(params) {
  return Object.keys(params).reduce((paramsList, key, index) => {
    paramsList.push(toParameter(key, params[key]));
    return paramsList;
  }, []);
}

export function toParameter(name, value) {
  return `${name}="${value}"`;
}
