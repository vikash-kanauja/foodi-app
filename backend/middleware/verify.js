import jwt from 'jsonwebtoken';
import userModel from '../modules/user.js';

export const authenticateToken = async (req, res, next) => {
    const token = req.cookies.token || req.headers['Authorization']; // Get the token from cookies
    // console.log(req.cookies,"////////////////////////////");

    if (!token) {
        console.error('No token provided');
        return res.sendStatus(401); // Unauthorized if no token
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRETE)
    const user =await userModel.findById(decoded.userId)

    try {
        
        if (!user) {
            console.error('User not found');
            return res.sendStatus(404); // Not Found if user doesn't exist
        }

        req.user = user; // Attach user info to request
        // console.log(user,"userinfo;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;");
        
        next(); // Pass control to the next middleware or route handler
    } catch (error) {
        console.error('Error fetching user:', error.message);
        res.sendStatus(500); // Internal Server Error if there’s an issue fetching the user
    }
    // jwt.verify(token,process.env.JWT_SECRET, async(err, decoded) => {
    //     if (err) {
    //         console.error('Token verification failed:', err.message);
    //         return res.sendStatus(403); // Forbidden if token is invalid
    //     }

    //     try {
    //         const userinfo = await userModel.findById(decoded.userId);
    //         if (!userinfo) {
    //             console.error('User not found');
    //             return res.sendStatus(404); // Not Found if user doesn't exist
    //         }

    //         req.user = userinfo; // Attach user info to request
    //         console.log(userinfo,"userinfo;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;");
            
    //         next(); // Pass control to the next middleware or route handler
    //     } catch (error) {
    //         console.error('Error fetching user:', error.message);
    //         res.sendStatus(500); // Internal Server Error if there’s an issue fetching the user
    //     }
    // });
};
