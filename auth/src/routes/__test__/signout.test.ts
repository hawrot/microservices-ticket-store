import request from 'supertest';
import {app} from '../../app';


it('should clear the cookies after signout', async function () {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);


});
