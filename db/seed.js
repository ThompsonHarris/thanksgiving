const { db } = require('./connection');
const { Dish } = require('./models/Dish');
const { Person } = require('./models/Person');

const seed = async () =>{
    const people = [
      {
        name: 'Babbie',
        isAttending: true
      },
      {
        name: 'Ruthie',
        isAttending: true
      },
      {
        name: 'Morgan',
        isAttending: true
      },
      {
        name: 'Thompson',
        isAttending: false
      }
    ]
  
    const [Babbie, Ruthie, Morgan, Thompson] = await Promise.all(people.map(obj=>Person.create(obj)))
  
    const dishes = [
      {
        name: 'Tofurky',
        description: 'A tasty plant-based protein made for more than 35 years.',
        personId: 1
      },
      {
        name: 'Naan',
        description: 'Naan is leavened, oven-baked flatbread found in the cuisines mainly of Western Asia, Central Asia, Myanmar and the Carribean.',
        personId: 2
      },
      {
        name: 'Pickled Shrimp',
        description: 'Shrimp pickled in a mixture of onions, cider vinegar, canola oil, capers, celery seeds, sugar, salt and Tabasco.',
        personId: 3
      },
      {
        name: 'Grasshoppers',
        description: 'Marinated grasshopper kabobs with red peppers and onions.',
        personId: 4
      }
    ]
  
    const [Tofurky, Naan, Shrimp, Grasshoppers] = await Promise.all(dishes.map(obj=>Dish.create(obj)))
  
  }

  module.exports = {
    seed
  };