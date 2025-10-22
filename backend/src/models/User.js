import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    bio: {
      type: String,
      default: "",
    },
    profilePic: {
      type: String,
      default: "",
    },
    isOnboarded: {
      type: Boolean,
      default: false,
    },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    //native lang, learning lang, location- 31:10
  },
  { timestamps: true }
);

const User= mongoose.model("User",userSchema);

//pre hook(hash passwords)

userSchema.pre("save", async(next)=>{
    if(!this.isModified("password")) return next(); //if password is not modified do not try to hash it
    try{
        const salt= await bcrypt.genSalt(10);
            this.password=await bcrypt.hash(this.password, salt);
            next();
        
    }catch(error){
        next(error);


    }


})

export default User;