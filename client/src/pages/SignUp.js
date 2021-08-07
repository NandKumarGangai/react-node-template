import { withRouter } from 'react-router-dom';
import SignUp from '../components/signUp';
import { addNewUser } from '../serviceCalls';

const initialValues = {
    email: 'nandkumargangai@gmail.com',
    password: 'Nandu@1234'
};

const SignUpPage = ({ history }) => {

    const onSubmit = (values, { resetForm }) => {
        console.log(JSON.stringify(values, null, 2));
        addNewUser(values, history, resetForm);
    };

    const props = {
        initialValues,
        onSubmit
    };

    return (
        <SignUp {...props} />
    );
};

export default withRouter(SignUpPage);
