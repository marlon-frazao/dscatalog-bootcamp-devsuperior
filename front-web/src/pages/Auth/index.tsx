import React from 'react';
import { ReactComponent as AuthImage } from 'core/assets/images/auth.svg';
import './styles.scss';
import { Route, Switch } from 'react-router';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from 'core/components/Routes/PrivateRoute';

const Auth = () => (
    <div className="auth-container">
        <div className="auth-info">
            <h1 className="auth-info-title">
                Divulgue seus produtos <br />no DS Catalog
            </h1>
            <p className="auth-info-subtitle">
                Faça parte do nosso catálogo de divulgação e <br />aumente a venda dos seus produtos.
            </p>
            <AuthImage />
        </div>
        <div className="auth-content">
            <Switch>
                <Route path="/auth/login">
                    <Login />
                </Route>
                <PrivateRoute path="/auth/register" allowedRoutes={['ROLE_ADMIN']}>
                    <Register />
                </PrivateRoute>
                <Route path="/auth/recover">
                    <h1>Recuperar senha</h1>
                </Route>
            </Switch>
        </div>
    </div>
);

export default Auth;
