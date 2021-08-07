import axios from 'axios';

const navigateToLoginPage = history => history.push('/login');
const navigateToErrorPage = history => history.push('/error');
const navigateToDashboardPage = history => history.push('/dashboard');

const handleResponse = (history, reset) => () => {
    reset();
    navigateToLoginPage(history);
};

const handleError = history => err => {
    console.error('Custom Error: ', err);

    return navigateToErrorPage(history);
};

export const addNewUser = (reqBody = {}, history, resetFormValues) => {
    const request = {
        url: `${process.env.SERVER_HOST || 'http://localhost:8000'}/api/v1/signup`,
        method: 'post',
        data: JSON.stringify(reqBody),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return axios(request)
        .then(handleResponse(history, resetFormValues))
        .catch(handleError(history));
}

const handleLoginResponse = (history, reset) => (response) => {
    reset();
    console.log(response);
    localStorage.setItem('user', JSON.stringify(response.data.body || {}));
    navigateToDashboardPage(history);
};

export const userLogin = (reqBody = {}, history, resetFormValues) => {
    const request = {
        url: `${process.env.SERVER_HOST || 'http://localhost:8000'}/api/v1/login`,
        method: 'post',
        data: JSON.stringify(reqBody),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return axios(request)
        .then(handleLoginResponse(history, resetFormValues))
        .catch(handleError(history));
}

export const getDashboardData = async () => {
    const request = {
        url: `${process.env.SERVER_HOST || 'http://localhost:8000'}/api/v1/getdata`,
        method: 'post',
        data: JSON.stringify({
            path: 'https://s3-ap-southeast-1.amazonaws.com/he-public-data/courses26269ff.json'
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return axios(request)
        .then(res => res)
        .catch(err => { console.log('err: ', err); return [] });
}