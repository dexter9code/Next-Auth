import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { checkPassword } from "../../../helper/auth-utlis";
import { connectionDb } from "../../../helper/db-utl";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectionDb();

        const userCollection = client.db().collection("singup");

        const user = await userCollection.findOne({ email: credentials.email });
        const authUser = await checkPassword(
          credentials.password,
          user.password
        );

        if (!user || !authUser) {
          client.close();
          throw new Error(`Invalid username or Password`);
        }

        client.close();
        return { email: user.email };
      },
    }),
  ],
});
