const jwt = require("jsonwebtoken");
const User = require("../models/user");

require("dotenv").config();

module.exports = async function (req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.SECRET);
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }

  try {
    const user = await User.findByPk(decoded?.user?.id);
    if (!user) return res.status(401).json({ error: "User no longer exists" });
    req.user = user.get({ plain: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Authentication failed" });
  }

  next();
};
