import config from './config';
import { verifyToken, apiEndpoint, handler as handlerConstructor} from './index';

const handler = handlerConstructor(config);

export {
    handler
};
