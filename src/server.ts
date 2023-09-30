import express, { Express, Request, Response } from "express";
import { MarsClient } from "./clients/MarsClient";
import * as fs from 'fs'
import { Config } from "./types";
import { DB } from "./db";


const config:Config = JSON.parse(fs.readFileSync('./api.config.json', 'utf-8'))
const app: Express = express();
const port = 3000;




//INITIALIZATION
DB.create(config.database)


//CLIENTS
const marsClient = new MarsClient(config.nasa);


//COMMANDS
app.get('/ingest', async (req: Request, res: Response)=>{
    // const data = await marsClient.retrieveData()
    res.send(true);
});


app.listen(port, () => {
  console.log(`[Server]: I am running at https://localhost:${port}`);
});
