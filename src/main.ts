import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { json } from 'express';
import { AppModule } from './app.module';
import { type IEnvConfig } from './enviroment';
import { CustomConfigModule } from './modules/config/custom-config.module';
import { LoggerInstance } from './utils';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  await app.init();

  app.setGlobalPrefix('');
  app.use(json());
  // ? CALL PORT OF CUSTOM CONFIG ENV
  const configService = app.select(CustomConfigModule).get(ConfigService<IEnvConfig>);
  const port = configService.get('API_PORT');
  void app.listen(port, () => {
    LoggerInstance.debug(`app init in port: ${port}`)
  });
}
void bootstrap();
