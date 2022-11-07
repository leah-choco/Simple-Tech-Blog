const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Comments extends Model {}

Comments.init(
  {
    body: {
      type: DataTypes.STRING,
      allowNull:false
    }
  },
   
  {
    sequelize
   
  }
  );
  
  module.exports = Comments;
