import { connectToDatabase } from "@/utils/db";



export default async function handler(req, res) {
    const {page}  = req.query;
    const {filter}  = req.query;
   
  const { db } = await connectToDatabase();
  const filterCate = { categories: { $elemMatch: { label: filter } } }
  const count = await db.collection("stockProduct").estimatedDocumentCount()

  if(filter.length===0){
    const stocks = await db.collection("stockProduct").find({}).skip(parseInt(page)*10).limit(10).toArray();
    res.status(200).send({count,stocks});
  }else{
      const stocks = await db.collection("stockProduct").find(filterCate).skip(parseInt(page)*10).limit(10).toArray();
    res.status(200).send({count,stocks});
  }
  
 
}
