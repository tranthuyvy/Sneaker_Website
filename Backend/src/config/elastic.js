const { Client } = require('@elastic/elasticsearch');
import dotenv from "dotenv";
dotenv.config();
const client = new Client({
    node: process.env.URL,
    auth: {
        apiKey: process.env.KEY_ELASTIC
    }
});
export { client }