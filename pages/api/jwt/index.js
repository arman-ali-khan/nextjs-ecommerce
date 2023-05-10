var jwt = require('jsonwebtoken');

import { connectToDatabase } from "@/utils/db";


export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  if (req.method === "POST") {
    const user = req.body;
    const token  = jwt.sign(user,process.env.ACCESS_TOKEN,{expiresIn:'5h'})
    res.status(200).json(token);
    
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
