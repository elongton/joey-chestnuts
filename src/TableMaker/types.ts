export type Constraint = 'NOT NULL' | 'UNIQUE' | 'PRIMARY KEY' | 'CHECK' | 'FOREIGN KEY'

export type TableColumn = {
  name: string;
  datatype: ColumnType;
  length?: number;
  constraint: Constraint;
};

export type ColumnType =
//   | "BIGINT"
//   | "BIGSERIAL"
//   | "BIT"
//   | "BIT VARYING"
  | "BOOLEAN"
//   | "BOX"
//   | "BYTEA"
//   | "CHARACTER"
//   | "CHARACTER(N)"
//   | "CHAR"
//   | "CIDR"
//   | "CIRCLE"
//   | "DATE"
//   | "DOUBLE PRECISION"
//   | "INET"
  | "INTEGER"
//   | "INTERVAL"
//   | "JSON"
  | "JSONB"
//   | "LINE"
//   | "LSEG"
//   | "MACADDR"
//   | "MONEY"
//   | "NUMERIC"
//   | "PATH"
//   | "POINT"
//   | "POLYGON"
//   | "REAL"
//   | "SMALLINT"
//   | "SMALLSERIAL"
//   | "SERIAL"
  | "TEXT"
//   | "TIME"
  | "TIME WITH TIME ZONE"
  | "TIMESTAMP"
  | "TIMESTAMP WITH TIME ZONE"
//   | "TSQUERY"
//   | "TSVECTOR"
//   | "TXID_SNAPSHOT"
//   | "UUID"
//   | "XML"
  ;
