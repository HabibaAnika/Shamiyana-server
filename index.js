const express = require("express");
const cors = require("cors")
require("dotenv").config();
const app = express();
const port= process.env.PORT || 5000;

// middleware 
app.use(cors())
app.use(express.json())

// mongodb

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uurflxx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// collections
const userCollection = client.db("Shamiyana").collection("users");

async function run() {
  try {
    await client.connect();
    
    // insert user
    app.post("/user", async (req, res) => {
      const { email, status, wishlist, role } = req.body; // User details from request
      const existingUser = await collection.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
      
      const result = await collection.insertOne({
        email,
        role: role || 'buyer', 
        status,
        wishlist
      });
      res.status(201).json({ message: 'User registered successfully', userId: result.insertedId });

    })


  } finally {
    
  }
}
run().catch(console.dir);



// api
app.get("/", (req, res) => {
  res.send("Shamiyana Server is running");
})

// jwt 





app.listen(port, ()=> {
  console.log(`Server is running on port, ${port}`);
})