# Facebook Messenger Token Verification

A function to handle token verifications of the Facebook Messenger Platform format.

## Usage

## With express.js

```javascript
import express from 'express';
import { apiEndpoint } from './index';

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
