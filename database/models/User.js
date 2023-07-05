module.exports = (sequelize, dataTypes) => {
    let alias = "User";
    
    let cols = {
        id: {
            type: dataTypes.STRING(120),
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING(30),
            allowNull: false
        }
        
    };

    let config = {
        tableName: "user",
        timestamps: false
    }

    const User = sequelize.define(alias, cols, config);

    // Relational aspects
    User.associate = function(models){
        User.hasMany(models.Message, {
            as: 'messages',
            foreignKey: "user_id",
        })
    }

    return User;
}