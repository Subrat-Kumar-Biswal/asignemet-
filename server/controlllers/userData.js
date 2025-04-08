import userModel from "../models/user";

export const register = async (req, res) => {
  try {
    const { name, email, password, conformPassword } = req.body;
    if (!name || !email || !password || !conformPassword) {
      return res.status(303).json({
        message: "all filled are require",
        success: false,
      });
    }
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(403).json({
        message: "email id already registerd",
        success: false,
      });
    }
    userModel
      .create(req.body)
      .then((data) => res.json(data))
      .catch((error) => console.log(error));
    return res.status(201).json({
      message: "account created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  userModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("login successfully");
      } else {
        res.json("password is incorrect");
      }
    } else {
      res.json("user not found");
    }
  });
};


