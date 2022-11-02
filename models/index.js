const User = require('./User');
const newName = require('./BlogPost');

User.hasMany(BlogPost, {
    foreignKey: "user_id",
    onDelete: 'CASCADE'
});

BlogPost.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, BlogPost };