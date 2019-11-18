const { db } = require('./connection');
const { Dish } = require('./models/Dish');
const { Person } = require('./models/Person');

Dish.belongsTo(Person)
Person.hasMany(Dish)

module.exports = {
  db,
  Dish,
  Person
};
