const User = require('./User');
const BlogPost = require('./BlogPost');
const Comments = require('./Comments');

BlogPost.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

BlogPost.hasMany(Comments, {
    foreignKey: 'blogpost_id',
    onDelete: 'CASCADE'
});

Comments.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

module.exports = { User, BlogPost, Comments };