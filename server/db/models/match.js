const Sequelize = require('sequelize');
const db = require('../db');

const Match = db.define('match', {
  docId: {
    type: Sequelize.STRING,
  },
  userId: {
    type: Sequelize.INTEGER,
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
    
  },
  street:{
    
  },
  city:{
    type: Sequelize.STRING,
  },
  state:{
    type: Sequelize.STRING,
  },
  phoneNum:{

  },
  website:{
    type: Sequelize.STRING,
  },
  insurances:{

  },
  
});

module.exports = Match;