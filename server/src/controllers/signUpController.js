const bcrypt = require('bcrypt');
const _get = require('lodash/get');
const { UserModel } = require('../database/models');
const {
    genericError,
    genericResponseSender,
    status
} = require('../utils');

const signUpController = (req, res) => {
    const saltRounds = Number(process.env.SALT || 10);

    bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) {
            return genericError(res, err);
        }

        const body = _get(req, 'body', {});
        const { password } = body;

        bcrypt.hash(password, salt, async function (err, hash) {
            if (err) {
                return genericError(res, err);
            }

            try {
                const newUser = new UserModel({
                    ...body,
                    password: hash
                });

                newUser.save((err, response) => {
                    if (err) {
                        console.error('error: ', body, err);
                        return genericError(res, err);
                    }

                    genericResponseSender(res, { status: status.CREATED, response: { message: `Created ${[response].length} record....` } });
                });
            } catch (error) {
                return genericError(res, error);
            }
        });
    });
}


module.exports = {
    signUpController
};