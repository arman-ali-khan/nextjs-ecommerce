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
    const draw = req.body;
    const filter = { id: id };
    const option = { upsert: true };
    const updateDraw = {
      $set: draw,
    };
    console.log(draw,id);
   
    const result = await db
      .collection("draws")
      .updateOne(
        filter,
      updateDraw,
      option
      );
    res.status(200).json(result);
  } else {
    res.setHeader("Allow", ["PATCH"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
