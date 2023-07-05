module.exports = (sequelize, dataTypes) => {
    let alias = "Message";
    
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        user_id: {
            type: dataTypes.STRING(120),
            allowNull: false
        },
        message: {
            type: dataTypes.TEXT('medium'),
            allowNull: true,
        },
        timestamp: {
            type: dataTypes.DATE,
            defaultValue: dataTypes.NOW
        },
        msg_to: {
            type: dataTypes.STRING(120),
            allowNull: false
        }
    };

    let config = {
        tableName: "message",
        timestamps: false
    }

    const Message = sequelize.define(alias, cols, config);

    // Relational aspects
    Message.associate = function(models){
        Message.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user'
          })
    }

    return Message;
}