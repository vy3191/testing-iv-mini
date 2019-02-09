const request = require('supertest');
const server = require('./server.js');
const db = require('../data/dbConfig.js');

describe('the route handlers', () => {
    describe('get /', () => {
        test('It should respond with 200', async () => {
            const response = await request(server).get('/');
              expect(response.status).toBe(200);
        });
      
        test('It should respond with json', async () => {
               const response = await request(server).get('/');
               expect(response.type).toMatch(/json/i);
        });

        test('It should send correct response object', async () => {
             const response = await request(server).get('/');

             expect(response.body).toEqual({api: 'up'});
        });

        test('It should send correct response object', async () => {
            const response = await request(server).get('/hobbits');

            expect(response.body).toEqual([]);
               
        });           
    });

    describe('post /hobbits' , () => {
          
            afterEach( async () => {
                await db('hobbits').truncate(); 
            });
          
          test('It should respond with a 201 when body is correct', async () => {
                const body = { name: 'bilbo' };
                const response = await request(server).post('/hobbits').send(body);
                expect(response.status).toBe(201);
              
          });

           
          test('It should respond with an array containing a new id', async () => {
                const body = { name: 'bilbo'};
                const response = await request(server).post('/hobbits').send(body);
                expect(response.body.length).toBe(1);
          });

          test('It should respond with a 400 when body is missing data', async () => {
            const body = {};
            const response = await request(server).post('/hobbits').send(body);
            expect(response.status).toBe(400);           
        });
    });
});