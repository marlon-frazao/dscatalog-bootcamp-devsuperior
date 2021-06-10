import React from 'react';
import { Route, Switch } from 'react-router';

const Categories = () => {
    return (
        <div>
            <Switch>
                <Route path="/admin/categories" exact>
                    Categorias
                </Route>
                <Route path="/admin/categories/:categoryId">

                </Route>
            </Switch>
        </div>
    )
}

export default Categories;