# Facebook Messenger Token Verification

A function to handle token verifications of the Facebook Messenger Platform format.

## Usage

## With express.js

```javascript
import express from 'express';
import { apiEndpoint } from 'calamarble-fb-webhook-verify';

const expressConfig = {
    port: 8088,
    getPath: '/fbwebhook',
    messages: {
        serverRunning: (port) => `Server running on port ${port}`
    }
}
const fbVerifyConfig = {
    verifyToken: 'YOUR_VERIFY_TOKEN',
    messages: {
        validationFailed: 'Failed validation.'
    }
}
const config = Object.assign({}, expressConfig, fbVerifyConfig);
const app = express();
const getEndPoint = apiEndpoint(config);
app.get(config.getPath, getEndPoint);
app.listen(config.port, () => console.log(`Server running on port ${config.port}`));

```

## With claudia-api-builder

```javascript
import ApiBuilder from 'claudia-api-builder';
import { apiEndpoint as fbWebhookGet} from 'calamarble-fb-webhook-verify';

const api = new ApiBuilder();
const config = {
    verifyToken: 'YOUR_VERIFY_TOKEN',
    messages: {
        validationFailed: 'Failed validation.'
    }
}

api.get('/fbwebhook', fbWebhookGet(config));

export { api as default };
```

## With AWS Lambda and the "Method Request passthrough" template of API Gateway

```javascript
import { handler as handlerConstructor } from './path/to/calamarble-fb-webhook-verify/index';

const config = {
    verifyToken: 'YOUR_VERIFY_TOKEN',
    messages: {
        validationFailed: 'Failed validation.'
    }
}
const handler = handlerConstructor(config);
export { handler };
```

See [CONTRIBUTING.md](https://github.com/fczuardi/calamarble-fb-webhook-verify/blob/master/CONTRIBUTING.md) for screenshots of the API Gateway setup on AWS
