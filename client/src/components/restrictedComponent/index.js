import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { getDashboardData } from "../../serviceCalls";

const RedirectComponent = () => <Redirect to='/' />;

const RestrictedComponent = (props) => {
    const [isUser]  = useState(JSON.parse(localStorage.getItem('user')).token);

    useEffect(() => {
        const fetchData = () => {
            const data = getDashboardData();
            console.log('----', data);
        }
        fetchData();
      return () => {};
    }, []);

    if(!isUser) {
        return <RedirectComponent />
    }

    return (
        <h1>RestrictedComponent</h1>
    )
};

export default RestrictedComponent;