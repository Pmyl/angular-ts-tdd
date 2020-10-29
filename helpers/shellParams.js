function get() {
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

function parametersToList(params) {
  return Object.keys(params).reduce((paramsList, key, index) => {
    paramsList.push(toParameter(key, params[key]));
    return paramsList;
  }, []);
}

function toParameter(name, value) {
  return `${name}="${value}"`;
}

module.exports = {
  get: get,
  parametersToList: parametersToList,
  toParameter: toParameter
};