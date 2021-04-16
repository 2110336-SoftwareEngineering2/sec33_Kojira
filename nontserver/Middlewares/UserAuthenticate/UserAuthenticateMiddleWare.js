const UserAuthenticator = {
  nontOwnerAuthenticator: function nontOwnerAuthenticate(req, res, next) {
    if (req.user) {
      //console.log(req.user.userType);
      if (req.user.userType === "Nont Owner") {
        next();
      } else {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(401);
    }
  },
  nontSitterAuthenticator: function nontSitterAuthenticator(req, res, next) {
    if (req.user) {
      if (req.user.userType === "Nont Sitter") {
        next();
      } else {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(401);
    }
  },
  adminAuthenticator: function AdminAuthenticator(req, res, next) {
    if (req.user) {
      if (req.user.userType === "admin") {
        next();
      } else {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(401);
    }
  },
};

module.exports = UserAuthenticator;
