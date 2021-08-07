const bcrypt = require('bcrypt');
const _get = require('lodash/get');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../database/models');
const {
    genericError,
    genericResponseSender,
    status
} = require('../utils');

const loginController = (req, res) => {

    const { email, password } = _get(req, 'body', {});

    return UserModel.findOne({ "email": email }).select('+password').then(result => {
        if (result) {
            const hash = _get(result, 'password');

            bcrypt.compare(password, hash, function (err, check) {
                if (check) {
                    const token = jwt.sign(
                        {
                            data: req.body.email
                        },
                        process.env.JWT_SECRET,
                        {
                            expiresIn: 60 * 60
                        }
                    );

                    const response = {
                        token,
                        user: result.email
                    }
                    return genericResponseSender(res, { status: status.SUCCESS, response });
                }
                return genericError(res, err);
            });
        } else {
            return genericError(res);
        }
    });
};

module.exports = {
    loginController
}