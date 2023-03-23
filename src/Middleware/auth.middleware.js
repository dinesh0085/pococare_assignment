const jwt = require("jsonwebtoken");
const {
  verifyUserToken,
  generateToken,
  verifyUserRefreshToken,
} = require("../Controller/user.controller");

const auth = async (req, res, next) => {
  const token = req.cookies.jwt;
  const refresh_token = req.cookies.jwt_refresh;

  if (token) {
    const verifyToken = await verifyUserToken(token);
    if (verifyToken) {
      next();
    } else {
      if (refresh_token) {
        const verifyRefreshToken1 = await verifyUserRefreshToken(refresh_token);
        if (verifyRefreshToken1) {
          const createNewToken = await generateToken(verifyRefreshToken1.id);
          res.cookie("jwt", createNewToken, {
            maxAge: 7000 * 60 * 60 *24 ,
            httpOnly: true,
          });
          next();
        } else {
          res.redirect("/user/login");
        }
      } else {
        res.redirect("/user/login");
      }
    }
    
  } else {
    if (refresh_token) {
        const verifyRefreshToken1 = await verifyUserRefreshToken(refresh_token);
        if (verifyRefreshToken1) {
          const createNewToken = await generateToken(verifyRefreshToken1.id);
          res.cookie("jwt", createNewToken, {
            maxAge: 7000 * 60 * 60 *24,
            httpOnly: true,
          });
          next();
        } else {
          res.redirect("/user/login");
        }
      } else {
        res.redirect("/user/login");
      }
  }
  next();
};

module.exports = auth;
