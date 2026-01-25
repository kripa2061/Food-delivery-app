import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token) {
      return res.json({
        success: false,
        message: "Not authorized, login again",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // attach decoded data
    req.userId = decoded.id;
    req.userRole = decoded.role || "user";

    // admin-only check (optional)
    if (req.requireAdmin && req.userRole !== "admin") {
      return res.json({
        success: false,
        message: "Admin access denied",
      });
    }

    next();
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export default authMiddleware;
