import React from 'react';
import { Route, Switch } from 'react-router-dom';
import List from './List';

const Users = () => {
    return (
        <div>
            <Switch>
                <Route path="/admin/users" exact>
                    <List />
                </Route>
                <Route path="/admin/users/:usersId">

                </Route>
            </Switch>
        </div>
    );
}

export default Users;