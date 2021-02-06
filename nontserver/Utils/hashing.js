const bcrypt = require('bcrypt');

// The more rounds used, the more complex hashing and time usage for hashing
async function hashing(data, rounds = 10) {
  const salt = await bcrypt.genSalt(rounds);
  const hashed = await bcrypt.hash(data, salt);
  return hashed;
}

module.exports = hashing;