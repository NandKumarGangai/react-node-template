import { withRouter } from 'react-router-dom';
import Login from '../components/login';
import { userLogin } from '../serviceCalls';
// import { useDispatch } from 'react-redux';

const initialValues = {
    password: 'Nandu@1234',
    email: 'nandkumargangai@gmail.com',
};

const LoginComponent = ({ history }) => {
    // const dispatch = useDispatch();

    const onSubmit = (values, { resetForm }) => {
        console.log(JSON.stringify(values, null, 2));
        userLogin(values, history, resetForm);
    };

    const props = {
        initialValues,
        onSubmit
    };

    return (
        <Login {...props} />
    );
};

export default withRouter(LoginComponent);
