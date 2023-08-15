import { connectToDatabase } from "@/utils/db";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  const { id } = req.query;

  if (req.method === "GET") {
    const result = await db.collection("drawticket").find({ id: id }).toArray();
    
    // get all ticket numbers
    const allTickets = [];

    result.map((ticket) => {
      return ticket.ticketList.map((list) => {
        allTickets.push(list);
      });
    });
    //  get total amount
    let totalAmount = [];

    result.map((price) => {
      totalAmount.push(price.quantity * price.price)
    });

    // random data

    const random = Math.floor(Math.random() * allTickets.length);
    // draw result
    const drawResult = allTickets[random];
    // find winner
    const winFilter = {ticketList:{$in:[drawResult]}}
    // total amount sum
    let total = 0 
     for(let i = 0 ; i < totalAmount.length; i++){
       total += totalAmount[i]
     }
    //  total amount sum
    const winner = await db.collection('drawticket').findOne(winFilter)
    // winner email
    const winnerEmail = winner.email

    // console.log('totalAmount',total,winnerEmail,drawResult)

    // find user 
    const user = await db.collection('users').findOne({email:winnerEmail})
    // user balance
    const userBalance = parseFloat(user.balance)
    // total amount float
    const totalAmountFloat = parseFloat(total)
    // final winner user amount
    const finalAmount = userBalance+totalAmountFloat

    //  update user
    
    res.status(200).json(result);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
