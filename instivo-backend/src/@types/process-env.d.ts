declare global {
  // biome-ignore lint/style/noNamespace: <explanation>
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface ProcessEnv {
      [key: string]: string | undefined;

      NODE_ENV: 'default' | 'development' | 'production' | 'staging' | 'test';
    }
  }
}
