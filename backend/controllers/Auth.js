import userModel from "../modules/user.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  try {
    const { name, email, password, role = "user" } = req.body;
    console.log(name);
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(401).json({
        success: false,
        message: "User already exist",
      });
    }
    const newUser = new userModel({
      name,
      email,
      password,
      role,
    });
    const salt = await bcryptjs.genSalt(10);
    console.log(salt);
    const hashPassword = await bcryptjs.hash(password, salt);

    newUser.password = hashPassword;
    await newUser.save();

    res.status(200).json({
      success: true,
      message: "User Register successfully",
      newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(404).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRETE);
    // res.cookie("token", token, {
    //   httpOnly: true,
    //   secure: false,
    //   maxAge: 3600000,
    //   path: "/", // Ensure it's available across the application
    // });

    res.cookie('token', token, {
      httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
      secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
      sameSite: 'None', // Adjust according to your needs; 'None' is required for cross-site cookies
      maxAge: 3600000 // Cookie expiration in milliseconds (e.g., 1 hour)
  });
  
    // const data = { ...user, password: undefined };
    res.status(200).json({
      success: true,
      message: "Login user successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// const logout = (req, res) => {
//   try {
//     res.clearCookie("token");
//     res.status(200).json({
//       message: "User logout sucessfully",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };

const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true, // Ensure the cookie is the same as when set
      secure: process.env.NODE_ENV === 'production', // Match the secure setting
      sameSite: 'None', // Match the sameSite setting
      // path: "/" // Ensure the path matches the original cookie settings
    });
    
    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


export { register, login, logout };
