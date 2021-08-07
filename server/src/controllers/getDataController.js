const _get = require('lodash/get');
const jwt = require('jsonwebtoken');
const {
    genericError,
    genericResponseSender,
    authorizationError,
    status
} = require('../utils');

const getDataController = (req, res) => {
    const email = _get(req, 'body.userInfo.email') || _get(req, 'body.email');

    return jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
        if (err) {
            return authorizationError(res, err);
        }

        if (authData.data !== email) {
            return authorizationError(res);
        }

        const mockData = {
            key: 'test',
            value: 'test'
        }
        return genericResponseSender(res, { status: status.SUCCESS, response: mockData });
    });
};

module.exports = {
    getDataController
}