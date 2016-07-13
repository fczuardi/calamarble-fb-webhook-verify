import config from './config';

const verifyToken = (queryString, token) => (
    queryString['hub.mode'] === 'subscribe' &&
    queryString['hub.verify_token'] === token
);

const handler = (eventData, runtimeInfo, callback) => {
    if (!eventData.params || !eventData.params.querystring){
        return callback(config.messages.missingQueryString);
    }
    const response = verifyToken(eventData.params.querystring, config.verifyToken)
        ? eventData.params.querystring['hub.challenge']
        : config.messages.validationFailed
    ;
    return callback(null, response);
};

export {
    handler,
    verifyToken
};
