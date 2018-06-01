const Sequelize = require('sequelize');
const db = require('../db');

const Match = db.define('match', {
  docId: {
    type: Sequelize.INTEGER,
  }
});

module.exports = Match;