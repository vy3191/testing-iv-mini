const hobbits = require('./hobbitsModel.js');
const db = require('../data/dbConfig');

describe('The hobbit model',()=> {
      afterEach(async () => {
          await db('hobbits').truncate();         
      });
     test('It should insert new hobbits', async() => {
         const ids = await hobbits.insert({name: 'bilbo'});
         expect(ids.length).toBe(1);
         expect(ids[0]).toBe(1);
          
     });
});