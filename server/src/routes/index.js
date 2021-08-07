const axios = require('axios');
const express = require('express');
const Router = express.Router();
const { interceptRequest } = require('../middlewares');

const {
    signUpController,
    loginController,
    getDataController
} = require('../controllers');


Router.post('/signup', signUpController);

Router.post('/login', loginController);

Router.post('/verify-token', interceptRequest, getDataController);

Router.post('/getdata', (req, res) => {

    return axios.get(req.body.path || '')
        .then(response => {
            res.status(200).json(response.data)
        })
        .catch(err => {
            console.log(err); res.status(400).json({
                message: 'something went wrong'
            })
        })
});

module.exports = Router;