import jwt from "jsonwebtoken";
import User from "../model/userSchema.js";

const authMiddleware = async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req?.headers?.authorization?.split(" ")[1];
    console.log("token-----", token);
    try {
      if (token) {
        console.log("if method");
        const decodedUser = jwt.verify(token, process.env.SECRET_KEY);
        console.log("dec--", decodedUser);
        // find the User
        const user = await User.findById(decodedUser?.id);
        // Attach the user to the req object
        req.user = user;
        next();
      }
    } catch (error) {
      throw new Error("Not Authorize token expired");
    }
  } else {
    throw new Error("There is no token attached to the headers");
  }
};

export default authMiddleware;
