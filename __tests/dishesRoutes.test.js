// tests for /api/dishes

// supertest is a module that allows us to test our express server
const request = require('supertest');
const { app } = require('./../server/app.js');
const { db, Dish, Person } = require('./../db/index.js');

beforeEach(async done => {
  // wipe the db before each test block
  await db.sync({ force: true });
  done();
});
afterAll(async done => {
  // close the db connection upon completion of all tests
  await db.close();
  done();
});
describe('/api/dishes routes', () => {
  //mockData
  const dish1 = { name: 'turkey', description: 'delicious briney turkey' };
  const dish2 = { name: 'pie', description: 'delicious pumpkiney pie' };
  const dish3 = {name: 'salad', description: 'green salad with avocados'}
  const dish1Update = {name: 'Tofurky', description: 'meatless bad tasting turkey-like substitute'}

  describe('GET to /api/dishes', () => {
    it('test a GET request!', async () => {
      try{
        // seed the db
        await Promise.all([
          Dish.create(dish1),
          Dish.create(dish2),
        ])

        // grab the response
        const dishesGet = await request(app).get(
          '/api/dishes'
        );

        // test our assertions
        expect(dishesGet.statusCode).toBe(200);
        expect(dishesGet.headers['content-type']).toEqual(
          expect.stringContaining('json')
        );

        //test response 
        const dishesGetResponse = await dishesGet.body;
        expect(dishesGetResponse.length).toBe(2);
        expect(dishesGetResponse).toEqual(
          expect.arrayContaining([
            expect.objectContaining(dish1),
            expect.objectContaining(dish2),
          ])
        );
      }catch (err) {
        fail(err);
      }
    });
  });

  describe('GET to /api/dishes/:id', () => {
    it('test a GET request by ID!', async () => {
      try{
         // seed the db
         await Promise.all([
          Dish.create(dish1),
          Dish.create(dish2),
        ])

        // grab the response
        const dishesGetById = await request(app).get(
          '/api/dishes/1'
        );

        // test our assertions
        expect(dishesGetById.statusCode).toBe(200);
        expect(dishesGetById.headers['content-type']).toEqual(
          expect.stringContaining('json')
        );

        //test response 
        const dishesGetByIdResponse = await dishesGetById.body;
        expect(dishesGetByIdResponse.name).toEqual(dish1.name);

      }catch(err){
        fail(err)
      }
    });
  });

  describe('POST to /api/dishes/', () => {
    it('test a POST request!', async () => {
      try{
        //seed the DB
        await Promise.all([
          Dish.create(dish1),
          Dish.create(dish2),
        ])

        // create dish
        const createDish = await request(app).post('/api/dishes/')
          .send(dish3)
          .expect('Content-Type', /json/)
          .expect(200);

        // test our assertions
        expect(createDish.statusCode).toBe(200);

        //test response 
        const createDishResponse = createDish.body
        expect(createDishResponse.length).toBe(3)
        expect(createDishResponse).toEqual(
        expect.arrayContaining([
            expect.objectContaining(dish1),
            expect.objectContaining(dish2),
            expect.objectContaining(dish3),
          ]))

      }catch(err){
        fail(err);
      }
    });
  });

  describe('PUT to /api/dishes/:id', () => {
    it('test a PUT request!', async () => {
      try {
        //seed the DB
        await Promise.all([
          Dish.create(dish1),
          Dish.create(dish2),
        ])

        //update dish at id 1
        const updateDish = await request(app).put('/api/dishes/1')
        .send(dish1Update)
        .expect(200);

        // test our assertions
        expect(updateDish.statusCode).toBe(200);

        //test response
        const updateDishResponse = updateDish.body
        expect(updateDishResponse.name).toEqual(dish1Update.name)

      }catch(err){
        fail(err);
      }
    });
  });

  describe('DELETE to /api/dishes/:id', () => {
    it('test a DELETE request!', async () => {
      try {
        //seed the DB
        await Promise.all([
          Dish.create(dish1),
          Dish.create(dish2),
        ])

        //update dish at id 1
        const deleteDish = await request(app).delete('/api/dishes/1')
        .expect(200);

        // test our assertions
        expect(deleteDish.statusCode).toBe(200);

        //test response
        const deleteDishResponse = deleteDish.body
        expect(deleteDishResponse.length).toBe(1)
        expect(deleteDishResponse).toEqual(
        expect.arrayContaining([
            expect.objectContaining(dish2)
          ]))

      }catch(err){
        fail(err);
      }
    });
  });
});
