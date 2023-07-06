module.exports = (sequelize, DataTypes) => {
    const ContentTaggedUsers = sequelize.define('ContentTaggedUsers', {
        content_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        tagged_user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        }
    }, {
        tableName: 'content_tagged_users',
        timestamps: false
    });

    ContentTaggedUsers.associate = function (models) {
        ContentTaggedUsers.belongsTo(models.Content, {
            foreignKey: 'content_id'
        });
        ContentTaggedUsers.belongsTo(models.TaggedUsers, {
            foreignKey: 'tagged_user_id'
        });
    };

    return ContentTaggedUsers;
};
