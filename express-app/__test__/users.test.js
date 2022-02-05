const request = require('supertest')
const app = require('../app')
const dbo = require('../services/database');
const {describe, beforeEach, afterAll, it, expect} = require('jest');

describe('Get Users', () => {
    beforeEach(async () => {
        await dbo.getDb().then(db => db.collection('users').deleteMany({}));
    });

    afterAll(async() => {
        await dbo.client.close();
    });

    it('should get all users in empty array', async () => {
        const expected = { 'foo': 'bar' };
        await dbo.getDb().then(db => db.collection('users').insertOne(expected));

        const res = await request(app).get('/users');

        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(1);
        expect(res.body[0]).toMatchObject(expected);
    });
});
