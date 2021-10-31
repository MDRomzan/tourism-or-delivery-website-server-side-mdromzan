const { MongoClient } = require('mongodb');
const ObjectId=require("mongodb").ObjectId;
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
// GET SINGLE SERVICE
app.get("/services/:id",async(req,res)=>{
    const id=req.params.id;
    // console.log("grttiig one id",id);
    const query={_id:ObjectId(id)}
    const service= await servicesCollection.findOne(query);
    res.json(service);

})
// get delete id
app.delete("/services/:id",async(req,res)=>{
    const id=req.params.id;
    const query={_id:ObjectId(id)};
    const result=await servicesCollection.deleteOne(query);
    res.json(result);
})

    // post add services
    app.post("/services",async(req,res)=>{
        const service=req.body;
        console.log("hiiting the post api",service);
        const result=await servicesCollection.insertOne(service);
        console.log(result);
        res.json(result);
        //res.send("posted hitt")
    });
    // update user      
    app.put("/services/:id",async(req,res)=>{
        const id=req.params.id;
        // console.log(id);
        const updateService=req.body;
        // console.log(updateService);
        const filter={_id:ObjectId(id)};
        const options ={upsert:true};
        const updateDoc ={
            $set:{
                name:updateService.name,
                img:updateService.img,
                price:updateService.price,
                Description: updateService.Description
            },
        };
        const result=await servicesCollection.updateOne(filter,options,updateDoc);
        console.log("updateing Service ", req);
        res.json(result)
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