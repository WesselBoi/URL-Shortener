const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
  const userUid = req.cookies?.uid; // Get the user ID from cookies

  if (!userUid) {
    return res.redirect("/login");
  }
  const user = getUser(userUid);

  if (!user) {
    return res.redirect("/login");
  }

  req.user = user; // Attach user to request object
  next(); // Call next middleware
}

async function checkAuth(req,res,next){
    const userUid = req.cookies?.uid;
    const user = getUser(userUid);

    req.user=user;
    next();
}

module.exports = {
  restrictToLoggedinUserOnly,
  checkAuth,
};
// This middleware function restricts access to logged-in users only.
// It checks if a user ID is present in the cookies and retrieves the user from the session store.
// If the user is not found, it redirects to the login page.
// If the user is found, it attaches the user object to the request and calls the next middleware.
