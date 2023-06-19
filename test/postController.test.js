

describe('postController', function() {
    this.timeout(2000);
    let userId, postId, token;

    before(async function() {
        // Initialize database and create a user
        const user = await User.create({
            username: 'testUsername',
            password: 'testPassword'
        });
        userId = user._id;

        // Mocking the login part to get the token
        const res = await request
            .post('/api/user/login')
            .send({
                username: 'testUsername',
                password: 'testPassword'
            });

        token = res.body.token;
    });

    describe('POST /api/post', function() {
        it('should create a post', async function() {
            const res = await request
                .post('/api/post')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    imageURL: 'http://example.com',
                    userId: userId
                });

            expect(res.statusCode).to.equal(201);
            postId = res.body._id;
        });
    });

    describe('GET /api/post', function() {
        it('should get all posts', async function() {
            const res = await request
                .get('/api/post')
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('array');
        });
    });

    describe('GET /api/post/:id', function() {
        it('should get a post by id', async function() {
            const res = await request
                .get(`/api/post/${postId}`)
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).to.equal(200);
            expect(res.body).to.have.property('imageURL', 'http://example.com');
        });
    });

    describe('DELETE /api/post/:id', function() {
        it('should delete a post by id', async function() {
            const res = await request
                .delete(`/api/post/${postId}`)
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).to.equal(200);
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
