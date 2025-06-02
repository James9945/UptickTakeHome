const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/Users.js");

//Registration Control
const register = async (req, res) => {
    try{
        const {username, password} = req.body;
        const hashedPassword = bycrypt.hash(password, 10);

        const newUser = new User({username, password: hashedPassword});
        await newUser.save();
        res.status(201).json({message:`User registered with username ${username}`})
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

//Login Control
const login = async (req, res)=> {
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username});

        if(!username) {
            return res.status(404).json({message:"User not found!!"})
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid Login Credentials"})
        }

        const token = jwt.sign(
            {_id: user.id},
            process.env.JWT_SECRET,
        {expiresIn: "1h"});

        //Response to give back
        res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user._id,
          username: user.username,
          role: user.role
        }
      });

    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

module.exports = {register, login};