import { connectToDatabase } from "@/utils/db";
import { verifyJWT } from "../../jwt/verifyJWT";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  verifyJWT(req, res);

  const { email } = req.query;


  if (req.decoded.email !== email) {
    return res.status(401).send({ message: "Unauthenticated" });
  } else {
        // body
      const sendData = req.body;
      // user email
      const userEmail = sendData.senderEmail
      // agent email
      const agentEmail = sendData.agentEmail
      // admin email
      const adminEmail = process.env.NEXT_PUBLIC_ADMIN

        // get user
      const user = await db.collection("users").findOne({ email: userEmail });
      
        // get agent
      const agent = await db.collection("users").findOne({ email: agentEmail });
      
        // get admin
      const admin = await db.collection("users").findOne({ email: adminEmail });

      // update cashout money
      let updateMoney = parseFloat(sendData.amount)

      if(updateMoney>= 3000){
        updateMoney = updateMoney + 28
    }else if(updateMoney>= 2000){
        updateMoney = updateMoney + 20
    }else if(updateMoney>=1000){
        updateMoney = updateMoney + 14
    }else if(updateMoney>= 800){
        updateMoney = updateMoney + 10
    }else if(updateMoney>= 500){
        updateMoney = updateMoney + 8
    }else if(updateMoney>= 300){
        updateMoney = updateMoney + 6
    }else if(updateMoney>= 200){
            updateMoney = updateMoney + 4
    } else if(updateMoney>= 100){
            updateMoney = updateMoney + 2
    }
  
  
        const getMoneyPercent =  updateMoney -  sendData.amount
        
        // get agent 70 % 
        const agentPercent = ((70/ 100) * parseFloat(getMoneyPercent))
        // get admin 30 % 
        const adminPercent = ((30/ 100) * parseFloat(getMoneyPercent))
        // user new balance 
        const userNewBalance = parseFloat(user.balance) - parseFloat(updateMoney)
        console.log(sendData)

      // agent new balance
      const agentNewBalance = parseFloat(agent.balance) + parseFloat(agentPercent)

      // admin new balance
      const adminNewBalance = parseFloat(admin.balance) + parseFloat(adminPercent)


      // update admin account
      const updateAdmin = await db.collection("users").updateOne(
        { email: adminEmail },
        {
          $set: {
            balance: adminNewBalance,
          },
        },
        { upsert: true }
      );

      if(updateAdmin){
        const updateAgent = await db.collection('users').updateOne(
            { email: agentEmail },
            {
              $set: {
                balance: agentNewBalance,
              },
            },
            { upsert: true }
          );
          if(updateAgent){
            await db.collection('users').updateOne(
                { email: userEmail },
                {
                  $set: {
                    balance: userNewBalance,
                  },
                },
                { upsert: true }
              );
          }
      }
      
      

      const result = await db.collection("sendMoney").insertOne(sendData);
      res.status(200).json(result);


    }
   
}