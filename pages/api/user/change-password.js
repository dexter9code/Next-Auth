import { getSession } from "next-auth/react";
import { checkPassword } from "../../../helper/auth-utlis";
import { connectionDb } from "../../../helper/db-utl";
import { hashedPassword } from "./../../../helper/auth-utlis";

const changePassword = async function (req, res) {
  if (req.method !== "PATCH") {
    res.status(400).json({
      status: `Invalid`,
      message: `Can't process the request`,
    });
    return;
  }

  const session = await getSession({ req: req });
  if (!session) {
    res.status(401).json({
      status: `Error`,
      message: `Not-Authenticated`,
    });
    return;
  }

  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const client = await connectionDb();

  const userCollection = client.db().collection("singup");

  const currentUser = await userCollection.findOne({ email: userEmail });

  const passwordCheck = await checkPassword(oldPassword, currentUser.password);

  if (!passwordCheck) {
    res.status(403).json({
      status: `Error`,
      message: `Invalid-Password`,
    });
    client.close();
    return;
  }

  const newHashedPassword = await hashedPassword(newPassword);

  const result = await userCollection.updateOne(
    { email: userEmail },
    { $set: { password: newHashedPassword } }
  );
  client.close();
  res.status(200).json({
    status: `Success`,
    message: `Successfully changed the password`,
  });
};

export default changePassword;
