const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const TaggedUsers = sequelize.define('TaggedUsers', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    }, {
        tableName: 'tagged_users',
        timestamps: false
    });

    TaggedUsers.associate = function (models) {
        TaggedUsers.belongsToMany(models.Content, {
            through: models.ContentTaggedUsers,
            foreignKey: 'tagged_user_id'
        });
    };

    return TaggedUsers;
};
