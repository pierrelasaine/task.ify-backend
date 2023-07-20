import dotenv from "dotenv"
dotenv.config();


const SERVER_PORT = process.env.SERVER_PORT 

const client_id = process.env.CLIENT_ID

const client_secret= process.env.CLIENT_SECRET

const gpt_secretkey = process.env.GPT_SECRETKEY



const config = {
    port: SERVER_PORT,
    client_id,
    client_secret,
    gpt_secretkey
}

export default config;