const Sequelize = require('sequelize');
const db = require('../db');

const Match = db.define('match', {
  docId: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: true,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  firstName:{
    type: Sequelize.STRING,
  },
  lastName:{
    type: Sequelize.STRING,
  },
  title:{
    type: Sequelize.STRING,
  },
  image_url:{
    type: Sequelize.STRING,
  },
  street:{
    type: Sequelize.STRING,
  },
  city:{
    type: Sequelize.STRING,
  },
  state:{
    type: Sequelize.STRING,
  },
  phoneNum:{
    type: Sequelize.STRING,
  },
  website:{
    type: Sequelize.STRING,
  },
  insurances: {
    type:Sequelize.STRING,
  }
});

module.exports = Match;