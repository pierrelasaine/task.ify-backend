import dotenv from "dotenv"
dotenv.config();


const PORT = process.env.PORT || 3001

const client_id = process.env.CLIENT_ID

const client_secret= process.env.CLIENT_SECRET

const gpt_secretkey = process.env.GPT_SECRETKEY

const DB_HOST = process.env.DB_HOST

const backend_base_url = process.env.BACKEND_BASE_URL

const config = {
    port: PORT,
    client_id,
    client_secret,
    gpt_secretkey,
    DB_HOST,
    backend_base_url
}

export default config;