require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3006;

const usersRoute = require("./routes/users");
const loginRoute = require("./routes/login");

app.use(express.json());
app.use(cors());

app.use("/users", usersRoute);
app.use("/login", loginRoute);

app.get("/", (req, res) => {
  res.send("DeeChatAPI");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
