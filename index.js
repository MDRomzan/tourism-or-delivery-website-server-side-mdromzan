const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8080;


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ej29o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
console.log(uri);

async function run() {
    try {
        await client.connect();
        console.log("Hello  are you ready Baby");
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);


app.get("/", (req, res) => {
    res.send("Hello Server side is Running ");
});
app.listen(PORT, () => {
    console.log(`RD Travel is running on port:${PORT}`);
});