import { connectDB, insertDoc } from "../../helpers/db-util";

async function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;

    if (!email || !email.includes("@")) {
      res.status(422).json({ message: "invalid email" });
      return;
    }

    let client;

    try {
      client = await connectDB();
    } catch (error) {
      res.status(500).json({ msg: "connection to db failed" });
      return;
    }

    try {
      await insertDoc(client, "emails", { email });
      client.close();
    } catch (error) {
      res.status(500).json({ msg: "inserting data failed" });
      return;
    }

    res.status(201).json({ message: "signed up" });
  }
}

export default handler;
