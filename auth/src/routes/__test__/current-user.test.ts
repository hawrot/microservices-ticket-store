import request from 'supertest'
import {app} from "../../app";


it('should resopnds with details about the current user', async function () {
    const cookie = await global.signin();

    const response = await request(app)
        .get('/api/users/currentuser')
        .set("Cookie", cookie)
        .send()
        .expect(200);

    console.log(response.body.currentUser.email);
});
