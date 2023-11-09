const express= require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const port = process.env.PORT || 5000
require('dotenv').config()

app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('Nobin Uyodkta')
})


const uri = process.env.NEXT_PUBLIC_DB_URI
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const verifyJWT = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).send({message: 'unauthorized access'})
    }
    const token = authHeader.split(' ')[1]
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,function(err,decoded){
        if(err){
            return res.status(401).send({message: 'unauthorized access'})
        }
        req.decoded = decoded
        next()
    })
}
const run = async()=>{
    try{
        const usersCollection = client.db('nobinUdyokta').collection('users')

        app.post('/jwt',(req,res)=>{
            const user = req.body;
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET,{expiresIn: '4h'})
            res.send({token})
        })


    
        app.get('/getUser',async(req,res)=>{
            const email = req.query.email
            const result = await usersCollection.findOne({email:email})
            res.send(result) 
        })

     
    }
    finally{}
}

run().catch(err=>{
    console.error(err);
})




app.listen(port, ()=>{
    console.log('Server running on:', port);
})


module.exports = app;