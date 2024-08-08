import userModel from "../modules/user.js";

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
    console.log(userId);
    const user = await userModel.findByIdAndDelete(userId);
    console.log(user);
    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }
    res.status(200).json({ message: "user delete successfully", user });
  } catch (error) {
    res.status(400).json({ message: "internal server error" });
    console.log(error);
  }
};
export { getuser, deleteUser };
