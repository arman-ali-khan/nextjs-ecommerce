import { connectToDatabase } from "@/utils/db";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  if (req.method === "DELETE") {
    const { id, email, stockId } = req.query;
    // update stock
    // get product
    if (id) {
      const filter = { id: id };
      const option = { upsert: true };
      // get product
      const product = await db.collection("stockProduct").findOne(filter);
      // get user
      const user = await db.collection("users").findOne({ email: email });
      // get stock
      const stock = await db.collection("stocks").findOne({ id: stockId });

      // get stock count
      const stockCount = parseInt(product.stock);
      // add 1 and make this string
      const productStr = (stockCount + 1).toString();
      const updateProduct = {
        $set: { stock: productStr },
      };
      // update stock
      const update = await db
        .collection("stockProduct")
        .updateOne(filter, updateProduct, option);

      // update user balance
      if (update.acknowledged) {
        const userBalance =
          parseFloat(user.balance) + parseFloat(product.price);
        const userFilter = { email: email };
        const updateUser = {
          $set: { balance: userBalance },
        };
        const update = await db
          .collection("users")
          .updateOne(userFilter, updateUser, option);
        if (update.acknowledged) {
          if (stock.products.length > 1) {
            const stockFilter = {
              id: stockId,
              products: { $elemMatch: { id: id } },
            };
            const updateProduct = {
              $set: {status:false},
            };

            const result = await db
              .collection("stockProduct")
              .updateOne(stockFilter, updateProduct, option);
            res.status(200).json({ success: result  });
          } else {
            // update stock
            const result = await db.collection("stocks").deleteOne(stockFilter);
            res.status(200).json({ success: result.deletedCount > 0 });
          }
        }
      }
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
