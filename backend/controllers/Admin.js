import userModel from "../modules/user.js";
import bcryptjs from "bcryptjs"; // Assuming you're hashing passwords


const getuser = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const checkAdmin = await userModel.findById(userId)
    if(checkAdmin.role == 'admin'){
        return res.status(409).json({
            message: "you can not delete yourself/admin",
          });
    }
    // console.log(userId);
    const user = await userModel.findByIdAndDelete(userId);
    // console.log(user);
    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }
    res.status(200).json({ message: "user delete successfully", user });
  } catch (error) {
    res.status(400).json({ message: "internal server error" });
    // console.log(error);
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User with this email already exists",
      });
    }

    // Hash the password before saving it
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create a new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};



export { getuser, deleteUser, createUser };
