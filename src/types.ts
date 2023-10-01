export type NasaConfig = {
  key: string;
  account_email: string;
  account_id: string;
};

export type DBConfig = {
  user: string;
  host: string;
  database: string;
  password: string;
  port: number;
};

export interface Config {
  apis: {
    nasa: NasaConfig;
  };
  database: DBConfig;
}
