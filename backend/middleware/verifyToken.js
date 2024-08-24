import jwt from 'jsonwebtoken'
import userModel from '../modules/user.js'
const isAdmin = async(req,res,next)=>{
    try {
        const token =  req.cookies.token || req.headers['Authorization']
        if(!token){
            return res.status(401).json({
                message:"Unauthorized: No token provided"
            })
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRETE)
        const user =await userModel.findById(decoded.userId)
        
        if(!user){
            return res.status(401).json({
                message:"user not found"
            })
        }
        if(user.role !== "admin"){
            return res.status(403).json({
                message:"Unauthorized: User is not an admin"
            })
        }
        req.user = user    // send user to next function
        next()
    } catch (error) {
        // console.log(error);
    }
}
export default isAdmin;