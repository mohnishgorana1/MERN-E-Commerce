import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URL);
    if (connection) {
      console.log(`Connected to DB: ${connection.host}`);
    }
  } catch (error) {
    console.log(`ERROR Connecting to DB`);
    console.log(error);
    process.exit(1);
  }
};

export default connectToDB