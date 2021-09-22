const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Events = require('./Events');
const JobPost = require('./JobPost');

class JobEvents extends Model {}

JobEvents.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    job_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'JobPost',
        key: 'id',
      },
    },
    Events_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Events',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'job_events',
  }
);

module.exports = JobEvents;
