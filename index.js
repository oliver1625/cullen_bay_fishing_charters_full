const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./api/routes/auth");
const bookingRoute = require("./api/routes/book");
const userRoute = require("./api/routes/users");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const paymentGateway = require("./api/utils/payment");
const { verifyUser } = require("./api/utils/verifyToken");

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MONGO DB");
  } catch (error) {
    throw error;
  }
};

//Middleware
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/booking", bookingRoute);
app.use("/api/users", userRoute);
app.post("/api/create-payment-intent", verifyUser, paymentGateway);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8800, () => {
  connect();
  console.log("Connected to backend......");
});
