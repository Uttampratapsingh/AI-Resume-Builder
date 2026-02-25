import mongoose from "mongoose";

const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return; // If already connected or connecting, do nothing.
    try{
        mongoose.connection.on("connected", () => { //This does NOT connect yet. It just registers a listener.
            console.log("Connected to MongoDB");
        });
        let mongoURI = process.env.MONGO_URI;
        const projectName = "Resume-Builder";
        if(mongoURI){ 
            if(mongoURI.endsWith("/")){ // Remove the trailing slash if it exists
                mongoURI = mongoURI.slice(0, -1);
            }
            await mongoose.connect(`${mongoURI}/${projectName}`) // This is where the actual connection happens. It uses the registered listener above to log when connected.
        } else {
            console.error("MONGO_URI is not defined in the environment variables.");
        }   
    }catch(error){
            console.error("Error connecting to MongoDB:", error);
    }
}

export default connectDB;