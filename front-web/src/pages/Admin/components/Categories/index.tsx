import React from 'react';
import { Route, Switch } from 'react-router';
import List from './List';

const Categories = () => {
    return (
        <div>
            <Switch>
                <Route path="/admin/categories" exact>
                    <List />
                </Route>
                <Route path="/admin/categories/:categoryId">

                </Route>
            </Switch>
        </div>
    )
}

export default Categories;