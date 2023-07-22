import { connectToDatabase } from "@/utils/db";


export default async function handler(req, res) {
    const { db } = await connectToDatabase();

    if (req.method === "POST") {
        const draw = req.body;
        // get email
        const {email} = req.query;

        // update money
        const user = await db.collection('users').findOne({email:email})

        // total price
        const ticketPrice = parseInt(draw.price)* parseInt(draw.quantity)
console.log(ticketPrice)

      
        // id
        const id = draw.id
        // get one draw
        const getDraw = await db.collection("draws").findOne({ id: id });

        // old quantity 
        const oldQunatity = parseInt(getDraw.stock)
        // new quantity 
        const newQuantity = parseInt(draw.quantity);

        // result quantity
        const resultQuantity = (oldQunatity-newQuantity).toString()
        // remove quantity from draws
        const filter = { id: id };
        const option = { upsert: true };
        const updateProduct = {
            $set: { stock:resultQuantity },
        };
        // update qunatity
        const updateQunatity = await db
            .collection("draws")
            .updateOne(
                filter,
                updateProduct,
                option
            );
        if (updateQunatity.acknowledged) {
            console.log(updateQunatity)
            const result = await db.collection("drawticket").insertOne(draw);
            res.status(200).json(result);
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
