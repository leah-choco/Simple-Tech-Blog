const {  Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class BlogPost extends Model {}

BlogPost.init(
  {
    id:{
      type:DataTypes.INTEGER,
      allowNulle: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model:"user",
        key:"id",
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "blogpost",
  }
);

module.exports = BlogPost;
