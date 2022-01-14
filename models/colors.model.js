'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class colors extends Model {
        static associate(models) {
        }
    };
    colors.init({
        id: { type: DataTypes.SMALLINT, primaryKey: true, autoIncrement: true },
        name: DataTypes.STRING,
        year: DataTypes.INTEGER.UNSIGNED,
        color: DataTypes.STRING,
        pantone_value: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'colors',
        freezeTableName: true,
        timestamps: false,
    });
    return colors;
};