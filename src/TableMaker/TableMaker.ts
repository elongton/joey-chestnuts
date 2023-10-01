// https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-create-table/
import { DB } from "../db";
import { ColumnType, Constraint, TableColumn } from "./types";

export class TableMaker {
  constructor() {}

  public create = async ({
    name,
    columns,
    indexes,
    destructive,
  }: {
    name: string;
    columns: TableColumn[];
    indexes: string[] | null;
    destructive: boolean;
  }): Promise<string> => {
    const dropQuery = `DROP TABLE ${name};`;
    const createQuery = `CREATE TABLE IF NOT EXISTS ${name} (
        ${columns
          .map((column) => {
            return `${column.name} ${column.datatype} ${column.constraint}`;
          })
          .join(", \n")}
     );`;

    destructive && (await DB.query(dropQuery));
    await DB.query(createQuery);

    return `${destructive ? dropQuery : ""} \n ${createQuery}`;
  };

  public makeColumn = (
    name: string,
    datatype: ColumnType,
    constraint: Constraint,
    length?: number
  ): TableColumn => {
    return {
      name,
      datatype,
      constraint,
      length,
    };
  };
}
