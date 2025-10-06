import jwt from "jsonwebtoken";
export const isuserauth = async (req,res,next)=>{

    try {
        const token = req.cookies.token ; 
        if(!token){
            
            return res.status(400).json({message:"User not authenticated "})
    
        }
    
        const decodeToken = jwt.verify(token,process.env.JWT_SECRET);
        if(!decodeToken){
            return res.status(400).json({message:"Token not verified .."})
        }
    
        req.userId = decodeToken.userId ; 

    
        next();
    } catch (error) {
        res.status(500).json({message:"Error in isAuth"})
        
    }

}