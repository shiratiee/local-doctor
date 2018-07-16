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

  },
  lastName:{
    
  },
  title:{

  },
  image_url:{
    
  },
  street:{
    
  },
  city:{

  },
  state:{

  },
  phoneNum:{

  },
  website:{
    
  },
  insurances:{

  },
  
});

module.exports = Match;