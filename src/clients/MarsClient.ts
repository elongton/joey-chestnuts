import { TableMaker } from "../TableMaker/TableMaker";
import { TableColumn } from "../TableMaker/types";
import { NasaConfig } from "../types";

export class MarsClient extends TableMaker {
  config: NasaConfig;

  tableName = "mars";
  tableColumns: TableColumn[] = [
    this.makeColumn("test1", "TEXT", "NOT NULL"),
    this.makeColumn("test2", "TEXT", "NOT NULL"),
    this.makeColumn("test3", "TEXT", "NOT NULL"),
    this.makeColumn("created_on", "TIMESTAMP", "NOT NULL"),
  ];
  constructor(config: NasaConfig) {
    super();
    this.config = config;
  }

  public createTable = async ({ destructive }: { destructive: boolean }) => {
    const response = await this.create({
      name: this.tableName,
      columns: this.tableColumns,
      indexes: null,
      destructive,
    });

    return response;
  };
  public retrieveData = async () => {
    const response = await fetch(
      `https://api.nasa.gov/insight_weather/?api_key=${this.config.key}&feedtype=json&ver=1.0`
    );
    return await response.json();
  };
}
