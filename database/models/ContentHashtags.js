module.exports = (sequelize, DataTypes) => {
    const ContentHashtags = sequelize.define('ContentHashtags', {
        content_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        hashtag_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        }
    }, {
        tableName: 'content_hashtags',
        timestamps: false
    });

    ContentHashtags.associate = function (models) {
        ContentHashtags.belongsTo(models.Content, {
            foreignKey: 'content_id'
        });
        ContentHashtags.belongsTo(models.Hashtags, {
            foreignKey: 'hashtag_id'
        });
    };

    return ContentHashtags;
};
