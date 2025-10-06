import { User } from "../models/user.models.js"
import bcrypt from "bcryptjs";
import { sendVerifyMailOtp } from "../utils/sendMail.js";
import { genToken } from "../utils/genToken.js";

export const register = async (req,res) => {

   try {
     const { name, email, password, role , phone  } = req.body;
 
     if (!name || !email || !password || !phone) {
         return res.status(400).json({
             message: "Empty fields .."
         })
     }
 
     const isUser = await User.findOne({ email })
 
     if (isUser) {
         return res.status(400).json({ message: "User already exists .." })
 
     }
 
     const hashpassword = await bcrypt.hash(password, 12);

     const otp = Math.floor(1000+Math.random()*9000).toString();


 
     const newuser = new User({
         name,
         email,
         password: hashpassword,
         phone,
         role,
         otp,
         isOtpotpExpires:Date.now()+10*60*60*1000 
 
     })
 
     await newuser.save()
 
     sendVerifyMailOtp(email,otp);

     return res.status(201).json({
         message:"User created sucessfully !!",
         newuser
     })
   } catch (error) {

    console.log("error in user controllers \n \n ",error)

    return res.status(400).json({
        error
    })
    
   }
}

export const VerifyOtp = async (req, res) => {
    try {
      const { email, otp } = req.body;
  
      if (!otp) {
        return res.status(400).json({ message: "No OTP received" });
      }
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ message: "User does not exist or already removed" });
      }
  
      // Check OTP
      if (user.otp !== otp) {
        await User.deleteOne({ email }); // delete user on wrong OTP
        return res.status(400).json({ message: "Invalid OTP. User removed from DB." });
      }
  
      // Check expiry
      if (user.otpExpires < Date.now()) {
        await User.deleteOne({ email });
        return res.status(400).json({ message: "OTP expired. User removed from DB." });
      }
  
      // OTP correct
      user.isotpVerified = true;
      user.otp = undefined;
      user.otpExpires = undefined;
      await user.save();
  
      return res.status(200).json({ message: "User verified successfully!" });
    } catch (error) {
      console.error("Error in VerifyOtp:", error);
      return res.status(500).json({ message: "Server error" });
    }
  };

export const login = async (req,res)=>{

  try {
    const {email,password} = req.body ; 
  
    if(!email || !password){
      return res.status(400).json({message:"Empty credentials."})
    }
  
    const user = await User.findOne({email});
  
    if(!user){
      return res.status(400).json({message:"User not found .."})
    }
  
    const isverified = await bcrypt.compare(password,user.password);
  
    if(!isverified){
      return res.status(400).json({message:"Invalid credentials .. "})
    }
  
    const token = await  genToken(user._id,user.role);
  
    res.cookie("token",token,{
      secure: false,
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true
    })

  
    return res.status(200).json({message:"User logged in sucess ..." , user,token:token})
  } catch (error) {

    console.log("Error in login " , error)
    return res.status(401).json({message:"Server error in login "})
    
  }

}

export const logout = async (req,res)=>{
  return res.clearCookie("token").status(200).json({ message: "Signed out" });
}

export const getCurrentUser = async (req,res)=>{

  try {
    const userId = req.userId ; 
  
    const user = await User.findById(userId);
  
    if(!user){
  
      return res.status(400).json({message:"User not found .. "})
    }
  
    return res.status(200).json({message:"Found current user ..",user})
  
  } catch (error) {

    return res.status(400).json({message:"Error in getting current user .."})
    console.log("eror in get current user " , error)
    
  }


}
  