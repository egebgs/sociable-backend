const mongoose = require('mongoose');
const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
const sinon = require('sinon');
const User = require('../models/userModel');

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('User model', function() {
    this.timeout(2000);
    before(function (done) {
        mongoose.connect("mongodb+srv://admin:G0aN0umDKN89u1Q3@cluster0.wjs9s4e.mongodb.net/test?retryWrites=true&w=majority");
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function() {
            console.log('We are connected to test database!');
            done();
        });
    });

    describe('Schema', function() {
        it('should reject if no username is provided', async function() {
            let user = new User({
                password: 'testPassword',
            });

            try {
                await user.validate();
            } catch (err) {
                expect(err.errors.username).to.exist;
            }
        });


        it('should reject if no password is provided', async function() {
            let user = new User({
                username: 'testUsername',
            });

            try {
                await user.validate();
            } catch (err) {
                expect(err.errors.password).to.exist;
            }
        });

        it('should have optional profilePicture field', function() {
            let user = new User({
                username: 'testUsername',
                password: 'testPassword'
            });

            expect(user).to.have.property('profilePicture').to.be.undefined;
        });
    });

    after(async function() {
        this.timeout(2000); // Set the timeout for this hook to 5000 milliseconds
        try {
            await mongoose.connection.db.dropDatabase();
            await mongoose.connection.close();
            console.log('Test database disconnected and dropped.');
        } catch (error) {
            console.error('Error disconnecting test database: ', error);
        }
    });
});
