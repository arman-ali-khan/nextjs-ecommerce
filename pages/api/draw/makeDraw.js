import { connectToDatabase } from "@/utils/db";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  const { id } = req.query;

  if (req.method === "GET") {
    const result = await db.collection("drawticket").find({ id: id }).toArray();
    
console.log(result,id)    
    if(result.length){
    // draw 
    const drawData = await db.collection('draws').findOne({id:result[0].id})
     
    if(result[0].status && drawData?.stock === '0'){


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
    const updateUser = await db.collection("users").updateOne(
      { email: winnerEmail },
      {
        $set: { balance: finalAmount },
      },
      {upsert:true}
    );
    if(updateUser.acknowledged){
      // update draw status
     const drawId = result[0].id
     const updateDraw = await db.collection("draws").updateOne(
      { id: drawId },
      {
        $set: { status: false },
      },
      {upsert:true}
    );
    if(updateDraw.acknowledged){
    return  res.status(200).json({message:'Draw Result Published','winnder':user.email,windTicket:winner});
    }else{
      res.status(200).json({'status':'Draw status false'});
    }
    }    }
    else{
      res.json({message:'Draw Already Played'})
    }
  }else{
    res.json({message:'No ticket found'})
  }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
