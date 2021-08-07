const { connect } = require('mongoose');
require('dotenv').config();

module.exports = () => {
    const uri = process.env.MONGO_DB_URI;

    connect(uri, {
        dbName: process.env.DB_NAME,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
        .then(() => {
            console.log('Connection estabislished with MongoDB');
        })
        .catch(error => console.error(error.message));
}