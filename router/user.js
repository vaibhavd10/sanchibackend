import Express from "express";
import User from "../model/userSchema.js";
import bcrypt from "bcryptjs";
import generateToken from "../middleware/generateToken.js";

const router = Express.Router();

router.get("/user", async (req, res) => {
  console.log("user get method");
  const userList = await User.find({});
  console.log("user-list", userList);

  if (!userList) {
    res.status(500).json({ success: false });
  }
  res.status(200).json({ userList: userList });
});

//get single user
router.get("/user/:id", async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (!user) {
    res
      .status(500)
      .json({ message: "The user with the given ID was not found." });
  }
  res.status(200).send(user);
});

//register a user
router.post("/registerUser", async (req, res) => {
  const { name, email, password, city, state, contact, latitude, longitude } =
    req?.body;

  const userExist = await User.findOne({ email: email });
  if (userExist) {
    res.status(500).json({ message: "User already exists", status: false });
    return;
  }

  const Hash = await bcrypt.hash(password, 10);

  try {
    const data = new User({
      name,
      email,
      city,
      state,
      contact,
      latitude,
      longitude,
      password: Hash,
    });

    const user = await data.save();
    res
      .status(201)
      .json({ message: "Data added", status: true, userdata: user });
  } catch (err) {
    console.log(err);
  }
});

//login
router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req?.body.email });

  if (!user) {
    return res.status(400).send("User not found");
  }

  if (user && bcrypt.compareSync(req?.body.password, user?.password)) {
    return res.status(200).send({ user, token: generateToken(user?._id) });
  } else {
    return res.status(400).send("password is wrong");
  }
});

//Status Change by Distributor
router.put("/user/status/:id", async (req, res) => {
  const { userStatus } = req?.body;
  const { id } = req?.params;

  console.log("status---", userStatus);

  const userdata = await User.findByIdAndUpdate(
    id,
    {
      userStatus,
    },
    { new: true }
  );

  if (!userdata) {
    return res.status(400).send("the user cannot be found");
  }

  res
    .status(200)
    .json({ userdata: userdata, message: "Staus updated successfully" });
});

//edit user by own
router.put("/user/:id", async (req, res) => {
  const { name, email, password, city, state, contact, latitude, longitude } =
    req?.body;

  console.log("paramsiduser--", req.params.id);
  console.log("password =--", password);

  const Hash = await bcrypt.hash(password, 10);
  console.log("encrypted password---", Hash);

  const userdata = await User.findByIdAndUpdate(
    req.params.id,
    {
      name,
      email,
      city,
      state,
      contact,
      latitude,
      longitude,
      password: Hash,
    },
    { new: true }
  );

  if (!userdata) {
    return res.status(400).send("the user cannot be found");
  }

  res.status(200).send("User data updated", userdata);
});

export default router;
