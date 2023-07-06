const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Content = sequelize.define('Content', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        platform: {
            type: DataTypes.ENUM('Instagram', 'TikTok', 'Pinterest', 'Facebook', 'Twitter'),
            allowNull: false
        },
        title: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        caption: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        type: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        mediaURL: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        postDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        likes: {
            type: DataTypes.SMALLINT,
            allowNull: true
        },
        comments: {
            type: DataTypes.SMALLINT,
            allowNull: true
        },
        location: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        audio: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        brand: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        timestamp: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        tableName: 'content',
        timestamps: false
    });

    Content.associate = function (models) {
        Content.belongsTo(models.User, {
            foreignKey: 'user_id'
        });
        Content.belongsToMany(models.Hashtags, {
            through: models.ContentHashtags,
            foreignKey: 'content_id'
        });
        Content.belongsToMany(models.TaggedUsers, {
            through: models.ContentTaggedUsers,
            foreignKey: 'content_id'
        });
    };

    return Content;
};
