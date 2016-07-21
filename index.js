// the basic verification
const verifyToken = (queryString, token) => (
    queryString['hub.mode'] === 'subscribe' &&
    queryString['hub.verify_token'] === token
);

// for using with claudia-api-builder
const apiEndpoint = config => request => {
    return verifyToken(request.querystring, config.verifyToken)
        ? request.querystring['hub.challenge']
        : config.messages.validationFailed
    ;
}

// for using directly with aws api gateway (as in the readme)
const handler = config => (eventData, runtimeInfo, callback) => {
    if (!eventData.params || !eventData.params.querystring){
        return callback(config.messages.missingQueryString);
    }
    const response = apiEndpoint(config)(eventData.params);
    return callback(null, response);
};

export {
    verifyToken,
    apiEndpoint,
    handler
};
