import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: "3d"});
    return token;
}

//controller for user registration
//POST: /api/users/register

export const registerUser = async (req, res) => {
    try{
        const {name, email, password} = req.body;
        
        //check if required fields are present
        if(!name || !email || !password){
            throw new Error("Please fill all the fields");
        }

        //check if user already exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            throw new Error("User already exists");
        }

        //hash the password
        const salt = await bcrypt.genSalt(5); // Generate a salt with 10 rounds. The salt is a random string that is used to enhance the security of the hashed password. The higher the number of rounds, the more secure the hash, but it also takes more time to compute.
        const hashedPassword = await bcrypt.hash(password, salt);

        //create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save(); // Save the new user to the database. This is an asynchronous operation that returns a promise. The save() method will insert the new user document into the MongoDB collection and return the saved document, which includes the generated _id field.

        //generate token
        const token = generateToken(newUser._id); // _id is the unique identifier for the user document in MongoDB. It is automatically generated when the document is saved to the database. We use this _id to create a JWT token that can be used for authentication in future requests.

        newUser.password = undefined; // Set the password field to undefined before sending the user data in the response. This is a security measure to prevent the hashed password from being exposed in the API response.

        res.status(201).json({
            message: "User registered successfully",
            token,
            user: newUser
        });
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

//controller for user login
//POST: /api/users/login

export const loginUser = async (req, res) => {
    try{
        const {email, password} = req.body;

        //check if required fields are present
        if(!email || !password){
            return res.status(400).json({message: "Please fill all the fields"});
        }

        //check if user exists
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "Invalid email or password"});
        }

        //compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid email or password"});
        }

        //generate token
        const token = generateToken(user._id);

        user.password = undefined; // Set the password field to undefined before sending the user data in the response.

        res.status(200).json({
            message: "User logged in successfully",
            token,
            user
        });

    }catch(error){
        res.status(500).json({message: error.message});
    }
}


//controller for getting user by id
//GET: /api/users/data
export const getUserById = async (req,res)=>{
    try{
        const userId = req.userId;

        //check if user exists
        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({message:"user not found"});
        }

        //return user
        user.password = undefined; // Set the password field to undefined before sending the user data in the response.
        res.status(200).json({
            message: "User data fetched successfully",
            user
        });
    }catch(err){
        res.status(500).json({message: err.message});
    }
}