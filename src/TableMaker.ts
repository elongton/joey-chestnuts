import { DB } from "./db";

type TableColumn = {
    name: string,
    datatype:string
}

// constraints:
// NOT NULL – ensures that values in a column cannot be NULL.
// UNIQUE – ensures the values in a column unique across the rows within the same table.
// PRIMARY KEY – a primary key column uniquely identify rows in a table. A table can have one and only one primary key. The primary key constraint allows you to define the primary key of a table.
// CHECK – a CHECK constraint ensures the data must satisfy a boolean expression.
// FOREIGN KEY – ensures values in a column or a group of columns from a table exists in a column or group of columns in another table. Unlike the primary key, a table can have many foreign keys.


export class TableMaker {
  constructor() {}

  public updateOrCreateTable = async ({
    name,
    columns,
    indexes,
  }: {
    name: string;
    columns: string[];
    indexes: string[];
  }): Promise<void> => {
    await DB.query(`
    CREATE TABLE [IF NOT EXISTS] table_name (
        column1 datatype(length) column_contraint,
        column2 datatype(length) column_contraint,
        column3 datatype(length) column_contraint,
        table_constraints
     );`)
  };


  

}
