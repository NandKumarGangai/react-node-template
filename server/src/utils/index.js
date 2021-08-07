
const saltRounds = Number(process.env.SALT || 10);
const status = {
    SUCCESS: 200,
    CREATED: 201,
    NO_CONTENT: 204
}
const rejectGenericError = _ => Promise.reject({
    success: false,
    cause: _
});

const genericError = (res, err = {}) => {
    console.error('Error: ', err);

    return res.status(400).json({
        success: false,
        statusCode: 400,
        error: 'Something went wrong....'
    });
};

const authorizationError = (res, err = {}) => {

    return res.status(401).json({
        success: false,
        statusCode: 401,
        error: 'You are not logged in....'
    });
};

const genericResponseSender = (
    res,
    {
        status = status.SUCCESS,
        response = {}
    }) => res.status(status).json({
        success: true,
        statusCode: status,
        body: response
    });

module.exports = {
    genericResponseSender,
    rejectGenericError,
    genericError,
    authorizationError,
    saltRounds,
    status
}
