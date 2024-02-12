import { KindError } from '../KindError';
import { SystemError } from './SystemError';

export class GetSecretError extends SystemError {
  constructor() {
    super('Cant get secrets [AWS]');
    this.code = 'connection/get-secret-error';
    this.name = 'GetSecretError';
    this.kind = KindError.SYSTEM;
  }
}
