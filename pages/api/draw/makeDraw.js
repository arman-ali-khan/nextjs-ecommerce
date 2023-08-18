import { connectToDatabase } from "@/utils/db";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  const { id } = req.query;

  if (req.method === "GET") {
    const result = await db.collection("drawticket").find({ id: id }).toArray();
    
 
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
    // find agent 
    const agent = await db.collection('users').findOne({email:user.agent})
    // find admin 
    const admin = await db.collection('users').findOne({email: process.env.NEXT_PUBLIC_ADMIN})


    // user balance
    const userBalance = parseFloat(user.balance)
    // user balance
    const agentBalance = parseFloat(agent.balance)
    // user balance
    const adminBalance = parseFloat(admin.balance)
    // total amount float
    const totalAmountFloat = parseFloat(total)
 

    
     // get 10% for agent
     const agentPercent = ((10/ 100) * totalAmountFloat)

     // user percent 85%
     const userPercent = ((85/ 100) * totalAmountFloat)

     // admin percent 5%
     const adminPercent = ((85/ 100) * totalAmountFloat)
    
   

    //  update user
    const updateUser = await db.collection("users").updateOne(
      { email: winnerEmail },
      {
        $set: { balance: userBalance + userPercent },
      },
      {upsert:true}
    );

    // update agent balance
    const updateAgent = await db.collection("users").updateOne(
      { email: user.agent },
      {
        $set: { balance: agentBalance + agentPercent },
      },
      {upsert:true}
    );

    // update admin balance
    const updateAdmin = await db.collection("users").updateOne(
      { email: admin.email },
      {
        $set: { balance: adminBalance + adminPercent },
      },
      {upsert:true}
    );

      // show final result
    if(updateUser.acknowledged && updateAgent.acknowledged && updateAdmin.acknowledged ){
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
     const result =  await db.collection('drawResults').insertOne({winnder:user,ticket:winner,draw:drawData})
     if(result.acknowledged){
       return  res.status(200).json({message:'Draw Result Published','winnder':user.email,windTicket:winner,draw:drawData});
     }
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
