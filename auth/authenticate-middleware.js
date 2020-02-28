/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const bcrypt = require("bcryptjs");

const Users = require("../jokes/jokes-model.js");

module.exports = (req, res, next) => {
  let { username, password } = req.headers;

  if (username && password) {
    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          next();
        } else {
          res.status(401).json({ message: "Invalid Credentials" });
        }
      })
      .catch(({ name, message, stack }) => {
        res.status(500).json({ name, message, stack });
      });
  } else {
    res.status(401).json({ you: "shall not pass!" });
  }
};
