import test from 'ava';
import config from '../config';
import { verifyToken, apiEndpoint, handler } from '../';

test('config file has a verify Token', t => {
    t.truthy(config.verifyToken);
});

test('verify Token function returns true if the token matches', t => {
    const challenge = 'foo';
    const requestPayload = {
        'hub.mode': 'subscribe',
        'hub.verify_token': config.verifyToken,
        'hub.challenge': challenge
    };
    t.is(verifyToken(requestPayload, config.verifyToken), true);
});

test('apiEndpoint tests', t => {
    const challenge = 12345;
    const emptyRequest = {};
    const fbRequest = {
        querystring: {
            'hub.mode': 'subscribe',
            'hub.verify_token': config.verifyToken,
            'hub.challenge': challenge
        }
    }
    t.throws(() => apiEndpoint(emptyRequest));
    t.is(apiEndpoint(fbRequest), challenge);
});

test('AWS Lambda handler returns error when event has missing parameters', t => {
    const eventData = {};
    const eventData2 = { params: { foo: 'bar' } };
    const runtimeInfo = {};
    const callback = (error, data) => {
        return t.truthy(error);
    };
    t.plan(2);
    handler(eventData, runtimeInfo, callback);
    handler(eventData2, runtimeInfo, callback);
});

test('AWS Lambda handler returns the querystring challenge when token matches', t => {
    const challenge = 'foo';
    const requestPayload = {
        'hub.mode': 'subscribe',
        'hub.verify_token': config.verifyToken,
        'hub.challenge': challenge
    };
    const callback = (error, data) => {
        return data;
    };
    const runtimeInfo = {};
    t.is(
        challenge,
        handler({ params: { querystring: requestPayload } }, runtimeInfo, callback)
    );
});
