import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    // const usertoken = req.headers.authorization?.split(" ")[1];
    const usertoken = req.cookies.usertoken;

    if (!usertoken) {
      return res
        .status(401)
        .json({
          success: false,
          message: "Not authorized. Please log in again.",
        });
    }

    jwt.verify(usertoken, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid token." });
      }
      if (!user || !user.id) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized access." });
      }
      req.userId = user.id;
      next();
    });
  } catch (error) {
    console.error("Authorization error:", error.message, {
      headers: req.headers,
    });
    return res
      .status(401)
      .json({
        success: false,
        message: "Unauthorized access",
        error: error.message,
      });
  }
};

export { authUser };
