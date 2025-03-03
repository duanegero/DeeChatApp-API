//importing modules to use in app
require("dotenv").config();
const bcrypt = require("bcrypt");
const router = require("express").Router();
const jwt = require("jsonwebtoken");

//importing helper function
const { postLoginCredentials } = require("../helper functions/postHelpers");

//getting API key, log for testing
const apiKey = process.env.API_KEY;
console.log(`API KEY: ${apiKey}`);

//defining a post route
router.post("/", async (req, res) => {
  //variable to handle username and password
  const { username, password } = req.body;

  //if no username or password return error status json
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Please enter username and password" });
  }

  try {
    //variable to handle helper function call
    const user = await postLoginCredentials(username);

    //if no user return error status json
    if (!user) {
      return res.status(400).json({ message: "Invalid username" });
    }

    //variable to check if user password is a match
    const isMatch = await bcrypt.compare(password, user.password);

    //return error and status if no match
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    //get the user id fron json
    const userId = user.id;
    //create payload with user Id
    const payload = { userId: userId };

    //variable to handle jwt token
    const token = jwt.sign(payload, apiKey);

    //return success status and token
    return res.status(200).json({ token, userId, username });
  } catch (error) {
    //catch and log if any errors
    console.error("Error occurred during login", error);
    res.status(500).json({ message: "Server Error" });
  }
});
module.exports = router;
module.exports.apiKey = apiKey;
