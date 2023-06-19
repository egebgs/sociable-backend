const mongoose = require('mongoose');
const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
const User = require('../models/userModel');
const Post = require('../models/postModel');

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Post model', function() {
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
        it('should reject if no imageURL is provided', async function() {
            let user = new User({
                username: 'testUsername',
                password: 'testPassword'
            });

            let post = new Post({
                userId: user._id,
            });

            try {
                await post.validate();
            } catch (err) {
                expect(err.errors.imageURL).to.exist;
            }
        });

        it('should reject if no userId is provided', async function() {
            let post = new Post({
                imageURL: 'http://example.com/test.jpg',
            });

            try {
                await post.validate();
            } catch (err) {
                expect(err.errors.userId).to.exist;
            }
        });

        it('should have a default createdOn date', function() {
            let user = new User({
                username: 'testUsername',
                password: 'testPassword'
            });

            let post = new Post({
                imageURL: 'http://example.com/test.jpg',
                userId: user._id,
            });

            expect(post).to.have.property('createdOn');
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
