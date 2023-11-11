const { Client } = require('@elastic/elasticsearch');

const client = new Client({
    node: process.env.REACT_APP_CLIENT_URL,
    auth: {
        apiKey: process.env.REACT_APP_KEY_ELASTIC
    }
});
export { client }