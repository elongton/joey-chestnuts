import express, { Express, Request, Response } from "express";
import { MarsClient } from "./clients/MarsClient";
import * as fs from "fs";
import { Config } from "./types";
import { DB } from "./db";
const config: Config = JSON.parse(
  fs.readFileSync("./api.config.json", "utf-8")
);
DB.create(config.database);
const app: Express = express();
const port = 3000;

//CLIENTS
const marsClient = new MarsClient(config.apis.nasa);

//COMMANDS
app.get("/create-tables", async (req: Request, res: Response) => {
  let { destructive } = req.query as any;
  if (destructive && !["true", "false"].includes(destructive.toLowerCase())) {
    res.status(400);
    res.send("Wrong params");
    return;
  }
  destructive = String(destructive).toLowerCase() === "true" ? true : false;
  try {
    const queriesRun = await createTables({ destructive });
    res.send(queriesRun);
  } catch (e) {
    res.status(400);
    res.send("failed to create tables");
  }
});

app.get("/ingest", async (req: Request, res: Response) => {
  const data = await marsClient.retrieveData();
  res.send(data);
});

app.listen(port, () => {
  console.log(`[Server]: I am running at https://localhost:${port}`);
});

//METHODS
const createTables = async ({ destructive }: { destructive: boolean }) => {
  const queriesRun = [];
  queriesRun.push(await marsClient.createTable({ destructive }));
  return queriesRun.join("\n =========== \n");
};
