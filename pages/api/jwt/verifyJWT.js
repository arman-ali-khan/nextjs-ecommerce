var jwt = require('jsonwebtoken');

export function verifyJWT(req,res){
    const authHeader = req.headers.authorization
    if(!authHeader){
      return  res.status(401).send({message:'unautorized access '})
    }

    const token = authHeader.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN, function(error,decoded){
        if(error){
            return res.status(401).send({message:'Invalid Token'})
        }
        req.decoded = decoded;
    })
}