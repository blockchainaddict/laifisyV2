const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        username: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('master', 'user', 'client'),
            allowNull: false
        }
    }, {
        tableName: 'user',
        timestamps: false
    });

    User.associate = function (models) {
        User.hasMany(models.Content, {
            foreignKey: 'user_id'
        });
    };

    return User;
};
