import { connectToDatabase } from "@/utils/db";


export default async function handler(req, res) {
  const { db } = await connectToDatabase();


 const {id,email,sender,amount} = req.query
 console.log(id,email,sender,amount)
//   verifyJWT(req, res)
//   const user = req.decoded
//   if(user.user !== email){
//     return res.status(401).json({
//       message: "Unauthorized",
//     });
//   }

  if (req.method === "PUT") {
    const action = req.body;
    const filter = { transaction: id };
    const option = { upsert: true };
    const updateProduct = {
      $set: action,
    };

    if(action.status==='accept'){
        const user = await db.collection('users').findOne({email:sender})
        const updateBalance = parseFloat(amount) + parseFloat(user.balance)

       
        if(user.email){
           await db.collection('users').updateOne(
            {email:user.email},
            {
                $set: {balance: updateBalance}
              }
            ,
            {upsert: true}
        ) 
        }
        
    }
   
    const result = await db
      .collection("sendMoney")
      .updateOne(
        filter,
      updateProduct,
      option
      );
    res.status(200).json(result);
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
