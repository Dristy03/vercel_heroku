import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import client from "../../../lib/gql-client";

const LOGIN = `
query($email: String!) {
    users(where: {email: {_eq: $email}}) {
        id,
        password
      }
}
`;

const generateToken = (id) => {
  const tokenContents = {
    sub: id,
    "https://hasura.io/jwt/claims": {
      "x-hasura-allowed-roles": ["user"],
      "x-hasura-default-role": "user",
      "x-hasura-user-id": id,
    },
  };

  return jsonwebtoken.sign(tokenContents, "69f8fd4d54342b7ee3b0fcdf6def434c");
};

const handler = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log({ email, password });

    const result = await client.query(LOGIN, { email: email }).toPromise();

    if (result.error) {
      console.log({ resultError: result.error });
      res.status(400).json({
        message: result.error.message,
      });
    }

    if (
      result.data.users.length == 1 &&
      (await bcrypt.compare(password, result.data.users[0].password))
    )
      return res.status(200).json({
        data: result.data,
        token: generateToken(result.data.users[0].id),
      });
    else {
      return res.status(200).json({ message: "Invalid Credentials" });
    }
  } catch (err) {
    console.log({ err });
  }
};

export default handler;
