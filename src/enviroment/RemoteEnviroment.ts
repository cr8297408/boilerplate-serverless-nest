import { GetSecretValueCommand, SecretsManagerClient } from '@aws-sdk/client-secrets-manager';
import { EnvironmentError, GetSecretError } from 'src/domain';
import { LoggerInstance } from 'src/utils';
import {
  type IDatabase,
  type IEnvConfig,
  type IEnvironment,
  type IEnvironmentDependency,
  type ServiceApplicationApi,
} from './IEnviroment';

type SecretsValuesParameters = ServiceApplicationApi & IDatabase;

export class RemoteEnvironment implements IEnvironment {
  readonly #env: NodeJS.ProcessEnv = process.env;

  async setup({ ENVIRONMENT }: IEnvironmentDependency): Promise<IEnvConfig> {
    if (ENVIRONMENT === undefined) throw new EnvironmentError('NODE_ENV');

    const REGION_AWS = this.#env.REGION_AWS;
    const SECRET_NAME_AWS = this.#env.SECRET_NAME_AWS;

    if (REGION_AWS === undefined) throw new EnvironmentError('REGION_AWS');
    if (SECRET_NAME_AWS === undefined) throw new EnvironmentError('SECRET_NAME_AWS');

    let secretValue: SecretsValuesParameters = {
      API_PORT: '',
      DATABASE_URL: ''
    };

    try {
      const client = new SecretsManagerClient({ region: REGION_AWS });
      const command = new GetSecretValueCommand({ SecretId: SECRET_NAME_AWS, VersionStage: 'AWSCURRENT' });
      const response = await client.send(command);

      if (response.SecretString !== undefined) {
        secretValue = JSON.parse(response.SecretString);
      }
    } catch (error) {
      LoggerInstance.warn(`Error->EnvConfig->GetSecrets->${JSON.stringify(error)}`);
      throw new GetSecretError();
    }

    if (secretValue.API_PORT === undefined || secretValue.API_PORT === '')
      throw new EnvironmentError('.API_PORT');
    if (secretValue.DATABASE_URL === undefined || secretValue.DATABASE_URL === '')
      throw new EnvironmentError('.DATABASE_URL');

    return {
      ENVIRONMENT,
      ...secretValue,
    };
  }
}