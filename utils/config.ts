import dotenv from "dotenv"
dotenv.config();


const SERVER_PORT = process.env.SERVER_PORT 

const client_id = "d7527322ca104fe891303bb7837023e5";

const client_secret= "ba4545bd0ccc4014aa6419ea88421d94";

const config = {
    port: SERVER_PORT,
    client_id,
    client_secret
}

export default config;