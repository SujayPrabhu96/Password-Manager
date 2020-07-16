const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.sequelize.define(
    'app_pwds',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: Sequelize.INTEGER
        },
        date: {
            type: Sequelize.DATE
        },
        app: {
            type: Sequelize.STRING
        },
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false
    }
)