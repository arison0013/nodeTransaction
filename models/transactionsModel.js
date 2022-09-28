const dataTypes = require("sequelize/lib/data-types");

module.exports = (sequelize, DataTypes) => {

    const Transaction = sequelize.define('transaction', {
        id: {
            type: DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true,
        },

        date: {
            type: DataTypes.DATE,
            allowNull:false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull:false
        },
        type:{
            type:DataTypes.ENUM,
            values: ['credit', 'debit',],
        },
        amount:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        runningBalance:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
    },{
        timestamps:false,
    });
    return Transaction;
}