const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class JobPost extends Model { }

JobPost.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    link: {
      type: DataTypes.TEXT,
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    company_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    salary_information: {
      type: DataTypes.INTEGER,
    },
    contact_information: {
      type: DataTypes.TEXT,
    },
    application_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    additional_comments: {
      type: DataTypes.TEXT,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'jobPost',
  }
);

module.exports = JobPost;
