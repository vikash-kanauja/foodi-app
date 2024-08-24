import userModel from "../modules/user.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';

const register = async (req, res) => {
  try {
    const { name, email, password, role = "user" } = req.body;
    // console.log(name);
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
    // console.log(salt);
    const hashPassword = await bcryptjs.hash(password, salt);

    newUser.password = hashPassword;
    await newUser.save();

    res.status(200).json({
      success: true,
      message: "User Register successfully",
      newUser,
    });
  } catch (error) {
    // console.log(error);
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



const resetPassword = async (req, res) => {
const { resetToken, newPassword } = req.body;
// console.log(resetToken, newPassword,"&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");

  // Find the user by reset token and check if token is valid
  // const user = await userModel.findOne({
  //     resetToken,
  //     resetTokenExpires: { $gt: Date.now() },
  // });

  const decoded = jwt.verify(resetToken,process.env.JWT_SECRETE)
  const user =await userModel.findById(decoded.userId)

  if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

  // Update password
  user.password = await bcryptjs.hash(newPassword, 10);
  user.resetToken = undefined; // Clear reset token
  user.resetTokenExpires = undefined; // Clear expiration
  await user.save();

  res.json({ message: 'Password has been reset successfully' });
};


const forgotPassword = async (req, res) => {
  const { email } = req.body;

  // Find the user by email
  const user = await userModel.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });

  // Generate a password reset token
  // const resetToken = crypto.randomBytes(32).toString('hex');
  // user.resetToken = resetToken;
  // user.resetTokenExpires = Date.now() + 3600000; // 1 hour
  // await user.save();

  const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRETE);
  const data = await userModel.updateOne({email},{$set:{token:resetToken}})
  // res.status(200).send({success:true,message:"Please check your inbox of mail and reset password."})

  // Send email with reset link
  const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
      },
  });

  const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;
  const mailOptions = {
      to: email,
      from: process.env.EMAIL_USER,
      subject: 'Password Reset',
      text: `Click the following link to reset your password: ${resetUrl}`,
  };

  transporter.sendMail(mailOptions, (err) => {
      if (err) return res.status(500).json({ message: 'Error sending email' });
      res.json({ message: 'Password reset link sent' });
  });
};


export { register, login, logout, resetPassword, forgotPassword };
