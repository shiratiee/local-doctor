const Sequelize = require('sequelize');
const db = require('../db');

const Match = db.define('match', {
  docId: {
    type: Sequelize.STRING,
    allowNull: true
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
});

module.exports = Match;