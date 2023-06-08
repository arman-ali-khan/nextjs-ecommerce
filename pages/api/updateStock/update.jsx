import { connectToDatabase } from "@/utils/db";


export default async function handler(req, res) {
  const { db } = await connectToDatabase();

//   const {id,email} = req.query
//   verifyJWT(req, res)
//   const user = req.decoded
//   if(user.user !== email){
//     return res.status(401).json({
//       message: "Unauthorized",
//     });
//   }

  if (req.method === "PATCH") {
    const {id} = req.query;
    const stock = req.body;
    const filter = { id: id };
    const option = { upsert: true };
    const updateProduct = {
      $set: stock,
    };
    console.log(stock,id);
   
    const result = await db
      .collection("stockProduct")
      .updateOne(
        filter,
      updateProduct,
      option
      );
    res.status(200).json(result);
  } else {
    res.setHeader("Allow", ["PATCH"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
