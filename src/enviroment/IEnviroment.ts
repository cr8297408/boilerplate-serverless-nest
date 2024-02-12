export type EnvironmentType = 'local' | 'develop' | 'qa' | 'beta' | 'production';

export interface ServiceApplicationApi {
  API_PORT: string;
}

export interface IEnvConfig extends ServiceApplicationApi, IDatabase {
  ENVIRONMENT: EnvironmentType;
}

export interface IDatabase {
  DATABASE_URL: string;
}

export interface IEnvironmentDependency {
  ENVIRONMENT: EnvironmentType;
}

export interface IEnvironment {
  setup: (dependencies: IEnvironmentDependency) => Promise<IEnvConfig>;
}