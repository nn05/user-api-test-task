const supertest = require('supertest')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const { createServer } = require('../server/server')

const testInputData = {
    firstName: 'John',
    lastName: 'Connor',
    email: 'john.connor@testmail.com',
    interests: ['Buyer']
}

const expectedData = {
        "userId": expect.any(String),
        "name": "John Connor",
        "firstName": "John",
        "lastName": "Connor",
        "email": "john.connor@testmail.com",
        "homePhone": "",
        "interests": [
          "Buyer",
        ],
        "isBuyer": true,
        "isSeller": false,
        "isArchived": false,
        "isSpam": false,
}

const app = createServer()
let mongoServer
describe("Test Users API", () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll( () => {
    mongoose.disconnect();
    mongoose.connection.close();
    mongoServer.stop()
  });

  let userId
    describe("test post route", () => {
        test("should return a 200 and create user", async () => {
            const { statusCode, body } = await supertest(app)
                .post("/api/v1/users/")
                .send(testInputData)

            expect(statusCode).toBe(200)

            expect(body).toMatchObject(expectedData)
            userId = body.userId
            expectedData.userId = userId
        });
        test("should return a 400 incorrect input data", async () => {
            const testData = { ...testInputData }
            delete testData.email
            const { statusCode, body } = await supertest(app)
                .post("/api/v1/users/")
                .send(testData)

            expect(statusCode).toBe(400)
        });
    });
    
    describe("test get route", () => {
        test("should return a 200 and get users", async () => {
            const { statusCode, body } = await supertest(app)
                .get("/api/v1/users/")

            expect(statusCode).toBe(200)

            expect(body).toMatchObject([expectedData]);
        });
        test("should return a 200 and get user", async () => {
            const { statusCode, body } = await supertest(app)
                .get(`/api/v1/users/${userId}`)

            expect(statusCode).toBe(200)
            expect(body).toEqual(expectedData);
        });
        test("should return a 400 incorrect userId", async () => {
            const { statusCode, body } = await supertest(app)
                .get(`/api/v1/users/${'000000000000'}`)

            expect(statusCode).toBe(400)
        });
    });
    
    describe("test put/patch route", () => {
        test("should return a 200 and get updated user", async () => {
            const testData = { ...testInputData, firstName: 'Sarah'}
            const testExpectedData = { ...expectedData, firstName: 'Sarah', name: 'Sarah Connor'}
            const { statusCode, body } = await supertest(app)
                .put(`/api/v1/users/${userId}`)
                .send(testData)

            expect(statusCode).toBe(200)

            expect(body).toEqual(testExpectedData);
        });
        test("should return a 200 and get updated user", async () => {
            const testData = { firstName: 'John'}
            const { statusCode, body } = await supertest(app)
                .patch(`/api/v1/users/${userId}`)
                .send(testData)

            expect(statusCode).toBe(200)

            expect(body).toEqual(expectedData);
        });
    });

    describe("test delete route", () => {
        test("should return a 200 and get deleted user", async () => {
            const { statusCode, body } = await supertest(app)
                .delete(`/api/v1/users/${userId}`)

            expect(statusCode).toBe(200)

            expect(body).toEqual(expectedData);
        });
        test("should return a 200 and get empty array", async () => {
            const { statusCode, body } = await supertest(app)
                .get("/api/v1/users/")

            expect(statusCode).toBe(200)

            expect(body).toMatchObject([]);
        });
    });
});
