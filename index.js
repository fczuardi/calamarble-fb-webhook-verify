// the basic verification
const verifyToken = (queryString, token) => (
    queryString['hub.mode'] === 'subscribe' &&
    queryString['hub.verify_token'] === token
);

// AWS Gateway default template always wraps param values
// in double quotes even when they are not strings
const awsUnquote = value => {
    try { return JSON.parse(value); } catch () { return value; }
}

// for using with claudia-api-builder
const apiEndpoint = config => (req, res) => {
    const qs = (req.queryString || req.querystring || req.query);
    const result = verifyToken(qs, config.verifyToken)
        ? awsUnquote(qs['hub.challenge'])
        : config.messages.validationFailed;
    return res ? res.send(result) : result;
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
