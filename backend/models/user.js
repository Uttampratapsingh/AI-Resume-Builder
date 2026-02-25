import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({ // This is the schema for the User model. It defines the structure of the user documents in the MongoDB collection.
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
}, {timestamps: true}); // The timestamps option adds createdAt and updatedAt fields to the schema, which are automatically managed by Mongoose.

userSchema.methods.comparePassword = async function(candidatePassword){ // This is a method that will be available on all user documents. It takes a candidate password and compares it to the hashed password stored in the database using bcrypt.
    return await bcrypt.compare(candidatePassword, this.password); // bcrypt.compare returns a boolean indicating whether the passwords match. Return type is a Promise that resolves to true or false.
}

const User = mongoose.model("User", userSchema); // This creates a Mongoose model called "User" based on the userSchema. The model provides an interface for interacting with the MongoDB collection of users.

export default User; // Export the User model so it can be used in other parts of the application, such as in route handlers for user registration and login.