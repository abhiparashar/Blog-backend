const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const blogRoute = require("./routes/blog");
const authRoute = require("./routes/auth");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
require("dotenv").config();

//app
const app = express();

//database
// mongoose
//   .connect(process.env.DATABASE, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true
//   })
//   .then(() => console.log("DB connected"))
//   .catch(err => console.log(`DB Connection Error: ${err.message}`));

//db local
mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log("DB connected"))
  .catch(err => console.log(`DB Connection Error: ${err.message}`));

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

//cors
if ((process.env.NODE_ENV = "development")) {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

//routes middleware
app.use("/api", blogRoute);
app.use("/api", authRoute);

//port
const port = process.env.PORT || PORT;
app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
