import { SystemError } from './SystemError';
import { KindError } from '../KindError';

export class ConnectionProxyError extends SystemError {
  constructor(name: string) {
    super(`Cant connect to proxy [${name}]`);
    this.code = 'connection/connect-proxy-error';
    this.name = 'ConnectionProxyError';
    this.kind = KindError.SYSTEM;
  }
}
