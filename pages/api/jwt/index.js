var jwt = require('jsonwebtoken');

import { connectToDatabase } from "@/utils/db";


export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  const {email} = req.query


  if (req.method === "GET") {
    const user = await db.collection('users').findOne({email: email})
    if(user) {
      const token = jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN, {
        expiresIn: "1d",
      });
      res.status(200).json({accessToken: token });
    } 
    
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
