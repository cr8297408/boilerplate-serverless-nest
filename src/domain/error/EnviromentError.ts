import { KindError } from '../KindError';
import { SystemError } from './SystemError';

export class EnvironmentError extends SystemError {
  constructor(envName: string) {
    super(`Environment variable: ${envName} is undefined`);
    this.code = 'environment/set-variable-error';
    this.name = 'EnvironmentError';
    this.kind = KindError.SYSTEM;
  }
}
