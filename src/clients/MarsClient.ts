import { TableMaker } from "../TableMaker";
import { NasaConfig } from "../types";

export class MarsClient extends TableMaker{
    config: NasaConfig
    constructor(config: NasaConfig){
        super();
        this.config = config
    }

    public retrieveData = async () => {
        const response =  await fetch(`https://api.nasa.gov/insight_weather/?api_key=${this.config.key}&feedtype=json&ver=1.0`)
        return await response.json();
    }

}