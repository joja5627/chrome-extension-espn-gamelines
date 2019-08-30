const User = require('./user');
const Emotion = require('./emotion');

User.hasMany(Emotion);
Emotion.belongsTo(User);

module.exports = { User, Emotion };
