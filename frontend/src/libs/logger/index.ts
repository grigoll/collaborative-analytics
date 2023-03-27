import log, { Logger } from 'loglevel';
import { IS_DEV } from '@/config';

// For production app we'd setup services like Sentry/Datadog to monitor the app, but for now console will do
log.setLevel(IS_DEV ? 'debug' : 'error');

export type { Logger };

export const logger = log;
