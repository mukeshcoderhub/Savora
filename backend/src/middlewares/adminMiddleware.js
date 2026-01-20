export const adminOnly = (req, res, next) => {
     console.log("ADMIN CHECK:", req.user);
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};
