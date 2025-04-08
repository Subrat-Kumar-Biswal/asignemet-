import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/telecallerData", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("database connected");
    // const db = client.db("todo");
  } catch (error) {
    console.log(error);
    console.log("not connected");
  }
};

export default connectDb;
