import express from 'express';

const router = express.Router();

router.post('/api/users/signin', (req, res) =>{
    res.send('Sign in router');
});


export {router as signInRouter};
