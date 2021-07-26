import React, { useState } from 'react';
import { ReactComponent as SearchIcon } from 'core/assets/images/search-icon.svg';
import './styles.scss';
import Select from 'react-select';
import { OrderBy } from 'core/types/OrderBy';

type Props = {
    name?: string;
    orderBy?: OrderBy;
    handleChangeName: (name: string) => void;
    handleChangeOrderBy: (orderBy: OrderBy) => void;
    clearFilters: () => void;
}

const CategoryFilters = (
    {
        name,
        handleChangeName,
        handleChangeOrderBy,
        clearFilters,
        orderBy
    }: Props
) => {
    const [ordersBy] = useState<OrderBy[]>([{ id: 1, name: "Filtrar por Recentes", orderBy: "id", direction: "ASC" },
    { id: 2, name: "Filtrar por mais Antigos", orderBy: "id", direction: "DESC" },
    { id: 3, name: "Filtrar de A a Z", orderBy: "name", direction: "ASC" },
    { id: 4, name: "Filtrar de Z a A", orderBy: "name", direction: "DESC" }]);
    return (
        <div className="card-base product-filters-container">
            <div className="input-search">
                <input
                    className="form-control"
                    placeholder="Pesquisar Categoria"
                    type="text"
                    value={name}
                    onChange={event => handleChangeName(event.target.value)}
                />
                <SearchIcon />
            </div>
            <Select
                name="orderBy"
                key={`select-${orderBy?.id}`}
                value={orderBy}
                options={ordersBy}
                getOptionLabel={(option: OrderBy) => option.name}
                getOptionValue={(option: OrderBy) => String(option.id)}
                className="filter-select-container"
                classNamePrefix="category-select"
                placeholder="Ordenar por..."
                inputId="ordersBy"
                onChange={value => handleChangeOrderBy(value as OrderBy)}
                isClearable
            />
            <button
                className="btn btn-outline-secondary border-radius-10"
                onClick={clearFilters}
            >
                LIMPAR FILTRO
            </button>
        </div>
    )
}

export default CategoryFilters;