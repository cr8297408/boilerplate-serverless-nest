import { EnvironmentError } from 'src/domain';
import {
  type IDatabase,
  type IEnvConfig,
  type IEnvironment,
  type IEnvironmentDependency,
  type ServiceApplicationApi,
} from './IEnviroment';

export class LocalEnvironment implements IEnvironment {
  readonly #env: NodeJS.ProcessEnv = process.env;

  async setup({ ENVIRONMENT }: IEnvironmentDependency): Promise<IEnvConfig> {
    if (ENVIRONMENT === undefined) throw new EnvironmentError('NODE_ENV');

    const serviceApplicationApi: ServiceApplicationApi = {
      API_PORT: '',
    };

    serviceApplicationApi.API_PORT = this.#env.API_PORT ?? '';
    if (serviceApplicationApi.API_PORT === '') throw new EnvironmentError('API_PORT');

    const serviceDatabase: IDatabase = {
      DATABASE_URL: ''
    };

    serviceDatabase.DATABASE_URL = this.#env.API_PORT ?? '';
    if (serviceDatabase.DATABASE_URL === '') throw new EnvironmentError('DATABASE_URL');

    return {
      ENVIRONMENT,
      ...serviceApplicationApi,
      ...serviceDatabase
    };
  }
}