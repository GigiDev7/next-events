import { connectDB, insertDoc, getAllDocs } from "../../../helpers/db-util";

async function handler(req, res) {
  const eventId = req.query.eventId;
  let client;
  try {
    client = await connectDB();
  } catch (error) {
    res.status(500).json({ msg: "connecting to db failed" });
    return;
  }

  if (req.method === "POST") {
    const { email, name, text } = req.body;
    if (!email || !name || name.trim() === "" || !text || text.trim() === "") {
      res.status(422).json({ message: "invalid input" });
      client.close();
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    let result;

    try {
      result = await insertDoc(client, "comments", newComment);
      newComment._id = result.insertedId;

      res.status(201).json({ message: "added comment", comment: newComment });
    } catch (error) {
      res.status(500).json({ msg: "inserting comment failed" });
    }
  }
  if (req.method === "GET") {
    try {
      const list = await getAllDocs(client, "comments", { _id: -1 });
      res.status(200).json({ comments: list });
    } catch (error) {
      res.status(500).json({ msg: "getting data failed" });
    }
  }

  client.close();
}

export default handler;
