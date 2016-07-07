import config from './config';

const verifyToken = (queryString, token) => (
    queryString['hub.mode'] === 'subscribe' &&
    queryString['hub.verify_token'] === token
        ? queryString['hub.challenge']
        : 'Failed validation. Make sure the validation tokens match.'
);

const handler = (eventData, runtimeInfo, callback) => {
    if (!eventData.params || !eventData.params.querystring){
        return callback('Missing parameters');
    }
    return callback(null,
        verifyToken(eventData.params.querystring, config.verifyToken)
    );
};

export {
    handler,
    verifyToken
};
