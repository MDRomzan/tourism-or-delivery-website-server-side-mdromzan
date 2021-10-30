const { MongoClient } = require('mongodb');
const express = require('express');
require("dotenv").config();
const cors= require("cors");
const app = express();

// This is port
const PORT = process.env.PORT || 8080;
// middleware use
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ej29o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// console.log(uri);

async function run() {
    try {
        await client.connect();
       const  database=client.db("rdTravel");
       const servicesCollection=database.collection("services");
     const orderCollection=database.collection("orders");

    //    get all data
    app.get("/services",async(req,res)=>{
        const cursor = servicesCollection.find({});
        const services=await cursor.toArray();
        res.send(services);
    });
    // Add post order
    app.post("/orders",async(req,res)=>{
        const order=req.body;
        // console.log("order",order);
        const result=await orderCollection.insertOne(order);
        res.json(result)
    })

    } finally {
        // await client.close();
    }
}
run().catch(console.dir);


app.get("/", (req, res) => {
    res.send("Hello Rd Server side is Running ");
});
app.listen(PORT, () => {
    console.log(`RD Travel is running on port:${PORT}`);
});