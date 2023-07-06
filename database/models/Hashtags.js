const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Hashtags = sequelize.define('Hashtags', {
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
        tableName: 'hashtags',
        timestamps: false
    });

    Hashtags.associate = function (models) {
        Hashtags.belongsToMany(models.Content, {
            through: models.ContentHashtags,
            foreignKey: 'hashtag_id'
        });
    };

    return Hashtags;
};
