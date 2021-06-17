const jwt = require('jsonwebtoken');

exports.generateToken = (user, secret, expiresIn) => {
  const { id, fullName, email } = user;

  return jwt.sign({ id, fullName, email }, secret, { expiresIn });
};
