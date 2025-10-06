import jwt from "jsonwebtoken"

export const genToken = async (userId,role)=>{

   const token = jwt.sign({userId,role},process.env.JWT_SECRET,{expiresIn:"30d"})
    return token 
    
}