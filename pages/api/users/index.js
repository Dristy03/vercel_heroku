import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import client from "../../../lib/gql-client";

const SIGNUP = `
mutation($email: String!, $password: String!) {
  insert_users_one(object: 
    {email: $email, 
      password: $password})
  {
    id
  }
}
`;

const handler = async (req, res) => {
  try {
    const { email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
   

    client
      .mutation(SIGNUP, { email: email, password: hashedPassword })
      .toPromise()
      .then((result) => {
        console.log(result);

        if (result.error) {
          return res.status(400).json({
            message: result.error.message,
          });
        } else {
          
          const tokenContents = {
            sub: result.data.insert_users_one.id.toString(),
            "https://hasura.io/jwt/claims": {
              "x-hasura-allowed-roles": ["user"],
              "x-hasura-default-role": "user",
              "x-hasura-user-id": result.data.insert_users_one.id.toString(),
            },
           
          };
      
          const token = jsonwebtoken.sign(
            tokenContents,
            "69f8fd4d54342b7ee3b0fcdf6def434c"
          );
      
          return res.status(200).json({
            'data': result.data,
            'token': token
          });
        }
      });

    
  } catch (err) {
    console.log({ err });
  }
};

export default handler;
