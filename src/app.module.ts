import {
  type MiddlewareConsumer,
  Module,
  type NestModule,
} from '@nestjs/common';
import { LoggerMiddleware } from './middlewares';
import { CustomConfigModule } from './modules/config/custom-config.module';
import { HealthModule } from './modules/health';
import { PrismaModule } from './modules/prisma';

@Module({
  imports: [
    PrismaModule, 
    HealthModule, 
    CustomConfigModule,
    // ? Example for use custom config:
    // BullModule.forRootAsync({
    //     useFactory: (configService: ConfigService<IEnvConfig>) => ({
    //       redis: {
    //         host: configService.get('REDIS_HOST'),
    //         port: configService.get('REDIS_PORT'),
    //         password: configService.get('REDIS_PASSWORD')
    //       },
    //       defaultJobOptions: {
    //         removeOnComplete: true,
    //         attempts: 5,
    //       }
    //     }),
    //     inject: [ConfigService]
    //   })
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('v1');
  }
}
