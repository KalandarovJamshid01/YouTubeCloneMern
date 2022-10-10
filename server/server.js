const dotenv = require("dotenv").config();
const db = require("./config/db");
const app = require("./middleware/app");

app.listen(process.env.PORT, process.env.SERVER_URL, () => {
  console.log(`Server listen on port ${process.env.PORT}`);
});
