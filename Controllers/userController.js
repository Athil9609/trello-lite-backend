const users = require("../Models/userModel");

const jwt = require("jsonwebtoken");


const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.SECRET_KEY, {
    expiresIn: '7d', 
  });
};

exports.userReg = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await users.findOne({ email });
    if (existingUser) {
      res.status(400).json("User already exists with this email");
    } else {
      const newUser = new users({
        email,
        password,
        name,
      });
      await newUser.save();

      res.status(200).json({
        _id:newUser._id,
        name:newUser.name
      })

    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Registeration Failed", error });
  }
};
 

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // console.log(req.body)

    const user = await users.findOne({ email });
    // console.log(user)
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await user.matchPassword(password);
    // console.log(isMatch)
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
  }
};