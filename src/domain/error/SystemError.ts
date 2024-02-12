import { type KindError } from '../KindError';

export class SystemError extends Error {
  code: string;
  kind: KindError;
}
