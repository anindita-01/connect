import User from "../models/User.js";
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
  const {fullName, email, password}= req.body;
  try{
    if(!email || !password || !fullName){
      return res.status(400).json({
        message: "All fields r required"
      });
    }
    if(password.legth <6){
      return res.status(400).json({
        message: "pass must be atleast 6 characters"
    });
  };
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
  return res.status(400).json({ message: "Invalid email format" });
}
}catch(error){
  console.error(error);

}
const existingUser= await User.findOne({email});
if(existingUser){
  return res.status(400).json({ message: "email already exists" });
}
const idx= Math.floor(Math.random()*100)+1; //generates a num btwm 1-100
const randomAvatar= `https://avatar.iran.liara.run/public/${idx}.png`;

const newUser= User.create({
  fullName,
  email,
  password,
  profilePic: randomAvatar
})

const token= jwt.sign({userId: newUser._id}, process.env.JWT_SECRET_KEY,{expiresIn:"7d"})

}


export const login = async (req, res) => {
  res.send("login");
};
export const logout = (req, res) => {
  res.send("logout");
};
