import React, { Suspense, lazy } from 'react';
import Loader from './components/loader';
import { Route } from "react-router-dom";

const renderLoader = () => <Loader />;

const LoginComponent = lazy(() => import('./pages/Login'));
const SignUpComponent = lazy(() => import('./pages/SignUp'));
const RestrictedComponent = lazy(() => import('./components/restrictedComponent'));

const App = () => {
  const isLoggedIn = false;
  return (
    <Suspense fallback={renderLoader()}>
      <Route exact path={['/', '/login']} component={LoginComponent}></Route>
      <Route exact path='/signup' component={SignUpComponent}></Route>
      <Route exact path='/dashboard'>
        <RestrictedComponent isLoggedIn={isLoggedIn} />
      </Route>
    </Suspense>
  );
}

export default App;
