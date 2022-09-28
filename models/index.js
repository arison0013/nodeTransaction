const { Sequelize, DataTypes, Model } = require('sequelize');
const dbconfig = require('../config/dbconfig.js');

const sequelize = new Sequelize(
    dbconfig.DATABASE,
    dbconfig.USERNAME,
    dbconfig.PASSWORD, {
    host: dbconfig.HOST,
    dialect: dbconfig.dialect,
    pool: {
        max: dbconfig.pool.max,
        min: dbconfig.pool.min,
        acquire: dbconfig.pool.acquire,
        idle: dbconfig.pool.idle
    }
}
)

sequelize.authenticate().then(() => {
    console.log('connected...')
})
const db = {};

db.Sequelize = Sequelize,
db.sequelize = sequelize,

db.transactions = require('./transactionsModel.js')(sequelize, DataTypes)
db.users = require('./users.js')(sequelize, DataTypes)

db.sequelize.sync({ alter: true })
    .then(() => {
        console.log('Re-sync has been done')
    })
module.exports = db