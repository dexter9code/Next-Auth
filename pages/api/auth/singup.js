import { connectionDb, insertIntoDocument } from "../../../helper/db-utl";
import { hashedPassword } from "../../../helper/auth-utlis";

const singup = async function (req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;
    const userPassword = req.body.password;

    if (!userEmail || !userEmail.includes("@") || userPassword.trim() === "") {
      return res.status(433).json({
        status: `Error`,
        message: `Invalid Input provided`,
      });
    }
    const client = await connectionDb();

    const db = client.db();
    const existingUser = await db
      .collection("singup")
      .findOne({ email: userEmail });

    if (existingUser) {
      res.status(422).json({
        status: `Error`,
        message: `User exists Already!`,
      });
      await client.close();
      return;
    }

    const hashedPass = await hashedPassword(userPassword);

    const document = { email: userEmail, password: hashedPass };

    const result = await insertIntoDocument(client, "singup", document);
    console.log(result);

    res.status(201).json({
      status: `Success`,
      data: document,
    });

    await client.close();
  }
  if (req.method === "GET") {
    res.status(200).json({
      status: `Success`,
      message: `You have been tricked`,
    });
  }
};

export default singup;
