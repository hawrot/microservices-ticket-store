import request from 'supertest';
import {app} from "../../src/app";
import mongoose from 'mongoose';


it('should return an error if the ticket does not exist',  async function () {
   const ticketId = mongoose.Types.ObjectId();

   await request(app)
       .post('/api/orders')
       .set('Cookie', global.signin())
       .send({
           ticketId
       })
       .expect(404);

});
it('should return an error if the ticket is already reserved',async function () {

});
it('should return a ticket',  async function () {

});
