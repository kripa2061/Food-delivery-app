const adminOnly = (req, res, next) => {
  console.log("USER ID:", req.userId);

  if (req.userId !== "admin123") {
    return res.json({ success: false, message: "Admin access denied" });
  }

  next();
};

export default adminOnly;
