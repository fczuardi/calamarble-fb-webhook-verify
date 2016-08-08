import test from 'ava';
import config from '../config';
import { verifyToken, apiEndpoint, handler } from '../';

test('config file has a verify Token', t => {
    t.truthy(config.token);
});

test('verify Token function returns true if the token matches', t => {
    const challenge = 'foo';
    const requestPayload = {
        'hub.mode': 'subscribe',
        'hub.verify_token': config.token,
        'hub.challenge': challenge
    };
    t.is(verifyToken(requestPayload, config.token), true);
});

test('apiEndpoint tests', t => {
    const challenge = 12345;
    const emptyRequest = {};
    const fbRequest = {
        querystring: {
            'hub.mode': 'subscribe',
            'hub.verify_token': config.token,
            'hub.challenge': challenge
        }
    }
    t.throws(() => apiEndpoint(config)(emptyRequest));
    t.is(apiEndpoint(config)(fbRequest), challenge);
});

test('AWS Lambda handler returns error when event has missing parameters', t => {
    const eventData = {};
    const eventData2 = { params: { foo: 'bar' } };
    const runtimeInfo = {};
    const callback = (error, data) => {
        return t.truthy(error);
    };
    t.plan(2);
    handler(config)(eventData, runtimeInfo, callback);
    handler(config)(eventData2, runtimeInfo, callback);
});

test('AWS Lambda handler returns the querystring challenge when token matches', t => {
    const challenge = 'foo';
    const requestPayload = {
        'hub.mode': 'subscribe',
        'hub.verify_token': config.token,
        'hub.challenge': challenge
    };
    const callback = (error, data) => {
        return data;
    };
    const runtimeInfo = {};
    t.is(
        challenge,
        handler(config)({ params: { querystring: requestPayload } }, runtimeInfo, callback)
    );
});
