const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes/route")

app.use(cors());
app.use(express.json());

app.use(routes)

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});