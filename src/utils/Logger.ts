import { ConsoleLogger } from '@nestjs/common';

export class Logger extends ConsoleLogger {
  error(message: string): void {
    // add your tailored logic here
    super.error(message);
  }
}

export const LoggerInstance = new Logger();