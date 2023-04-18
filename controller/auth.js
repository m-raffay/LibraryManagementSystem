const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
// console.log(User);
const generateAccessToken = (id, username, role) => {
  const payload = {
    id,
    username,
    role
  };
  const options = {
    expiresIn: '1h'
  };
  const secretKey = 'secret_key';
  return jwt.sign(payload, secretKey, options);
};
const register = async (req, res) => {
  try {
    const { name,email,username, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 05);

    const user = await User.create({
      name,email,
      username,
      password: hashedPassword,
      role
    });

    const accessToken = generateAccessToken(user.id, user.username, user.role);

    res.json({ accessToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};
const login = async (req, res) => {
  try {
    const {username, password } = req.body;

    const user = await User.findOne({
      where: {
        username
      }
    });

    console.log('user:', user);

    // if (!user) {
    //   return res.status(400).json({ message: 'Invalid Credentials' });
    // }
   
    const passwordMatch = await bcrypt.compare(password, user.password);

    console.log('passwordMatch:', passwordMatch);

    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const accessToken = generateAccessToken(user.id, user.username, user.role);

    res.json({ accessToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};



module.exports = {
  register,
  login
};
