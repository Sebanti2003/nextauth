import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected: ", conn.connection.host);
    conn.connection.on("connected", () => {
        console.log("Connected to MongoDB");
    })
    conn.connection.on("disconnected", () => {
        console.log("Disconnected from MongoDB");
    })
    conn.connection.on("error", (err) => {
        console.log(err);
        process.exit(1);
    })
  } catch (err) {
    console.error("Something went wrong in connecting the connection",err);
    process.exit(1);
  }
};
export default connectDB;
