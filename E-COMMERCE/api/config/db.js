import mongoose from "mongoose";

const mongoDBConnect = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB connected succsessful`.bgBlue.black);
  } catch (error) {
    console.log(`${error.message}`.bgRed.black);
  }
};

export default mongoDBConnect;
