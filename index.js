const express = require("express");
const expertRoute = require("./routes/expert");
const app = express();

app.use(express.json());
app.use("/expert", expertRoute);

app.listen(4500, () => {
  console.log("Server running...");
});
