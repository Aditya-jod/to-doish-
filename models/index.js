const { sequelize } = require('../config/database');
const User = require('./User');
const Task = require('./Task');
const Routine = require('./Routine');

// Define associations
User.hasMany(Task, { foreignKey: 'userId', onDelete: 'CASCADE' });
Task.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Routine, { foreignKey: 'userId', onDelete: 'CASCADE' });
Routine.belongsTo(User, { foreignKey: 'userId' });

const db = {
  sequelize,
  User,
  Task,
  Routine
};

module.exports = db;
