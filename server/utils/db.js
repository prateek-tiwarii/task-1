import mongoose from "mongoose";

const connectToDb = async () => {
    try {
        await mongoose.connect('mongodb+srv://tiwariprateek1976:kA6NUuIHpSM4IsnV@cluster0.bhj2i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
    }
}

export default connectToDb;