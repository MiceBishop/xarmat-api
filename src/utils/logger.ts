import logger from 'pino';
import pretty from 'pino-pretty';

export default logger(pretty({
  translateTime: true,
}));
