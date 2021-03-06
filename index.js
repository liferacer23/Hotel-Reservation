const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");


dotenv.config();
const app = express();


const authRoute = require("./Routes/auth");
const usersRoute = require("./Routes/users");
const roomsRoute = require("./Routes/rooms");
const hotelsRoute = require("./Routes/hotels");


const url = process.env.MONGO_URL

const connect = async () => {
  try {
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log("Connected to mongoDB");
  } catch (err) {
    throw err;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});



app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/hotels", hotelsRoute);

app.use((err, req, res,next) => {
  const errorStatus = err.status || 500
  const errorMessage = err.message || "Something went wrong!"

  return res.status(500).json({
    success:false,
    status:errorStatus,
    message:errorMessage,
  });
});

app.listen(4000 || process.env.PORT, () => {
  connect();
  console.log("Backend is running on port 4000");
});
