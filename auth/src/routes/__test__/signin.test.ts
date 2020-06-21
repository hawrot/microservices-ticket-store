import request from 'supertest';
import {app} from '../../app';

it('should fail wen an email that does not exist is supplied', async function () {
    await request(app)
        .post('/api/users/signin')
        .send({
            email : 'test@test.com',
            password: 'password'
        })
        .expect(400);

    const response = await request(app)
        .post('/api/users/signout')
        .send({})
        .expect(200);

    console.log(response.get('Set-Cookie'));
});
