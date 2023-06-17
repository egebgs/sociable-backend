const chai = require('chai');
const sinon = require('sinon');
const mongoose = require('mongoose');
const User = require('../../models/userModel');

const { expect } = chai;

describe('User Model Test', () => {
    let sandbox;

    before(() => mongoose.connect(process.env.MONGO_URI));
    after(() => mongoose.connection.close());

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should have name, email, phone, username and password fields', (done) => {
        var user = new User({
            name: 'Test User',
            email: 'test@test.com',
            phone: '1234567890',
            username: 'testuser',
            password: 'password123'
        });

        user.save((err, user) => {
            expect(user).to.have.property('name');
            expect(user).to.have.property('email');
            expect(user).to.have.property('phone');
            expect(user).to.have.property('username');
            expect(user).to.have.property('password');
            done();
        });
    });

    it('should validate that a name, email, phone, username, and password are required', (done) => {
        var user = new User();

        user.validate((err) => {
            expect(err.errors.name).to.exist;
            expect(err.errors.email).to.exist;
            expect(err.errors.phone).to.exist;
            expect(err.errors.username).to.exist;
            expect(err.errors.password).to.exist;
            done();
        });
    });

    it('should not allow duplicate email, phone and username', async () => {
        const user1 = new User({
            name: 'User 1',
            email: 'test@test.com',
            phone: '1234567890',
            username: 'testuser',
            password: 'password123'
        });

        const user2 = new User({
            name: 'User 2',
            email: 'test@test.com',
            phone: '1234567890',
            username: 'testuser',
            password: 'password123'
        });

        try {
            await user1.save();
            await user2.save();
        } catch (err) {
            expect(err.errors.email).to.exist;
            expect(err.errors.phone).to.exist;
            expect(err.errors.username).to.exist;
        }
    });
});
