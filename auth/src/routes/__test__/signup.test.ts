// @ts-ignore
import request from 'supertest';
import {app} from '../../app';


it('should return a 201 on successful signup', async  () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);

});

it('should returns a 400 with an invalid email', async function () {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'tesdsd',
            password: 'password'
        })
        .expect(400);
});
