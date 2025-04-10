declare const config: {
    static: {
      port: number;
    };
    api: {
      port: number;
      transport: 'http' | 'https';
    };
    sandbox: {
      timeout: number;
      displayErrors: boolean;
    };
    db: {
      host: string;
      port: number;
      database: string;
      user: string;
      password: string;
    };
  };

  export default config;