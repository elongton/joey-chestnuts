import { DBConfig } from "./types";
const { Pool } = require("pg");

export class DB {
  pool: any;
  static instance: DB | null;
  constructor(config: DBConfig) {
    this.pool = new Pool(config);
  }
  static query = (text: string, params?: string) => {
    if (!this.instance) throw "db not initialized";
    return this.instance.query(text, params);
  };


  static create = (config: DBConfig) => {
    if (!this.instance) {
      try {
        this.instance = new DB(config);
        console.log("[Server]: DB Initialized");
      } catch (e) {
        throw "[Server]: Database did not initialize";
      }
    } else {
      console.log("[Server]: Already created.");
    }
  };
  static isCreated = () => {
    return !!this.instance;
  };

  public query = (text: string, params?: string) =>
    this.pool.query(text, params);
}
