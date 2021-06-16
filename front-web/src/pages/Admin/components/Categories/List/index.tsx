import { CategoriesResponse } from 'core/types/Category';
import Pagination from 'core/components/Pagination';
import { makePrivateRequest, makeRequest } from 'core/utils/request';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CardLoader from '../Loaders/CategoryCardLoader';
import { toast } from 'react-toastify';
import Card from '../Card';

const List = () => {
    const history = useHistory();
    const [categoriesResponse, setCategoriesResponse] = useState<CategoriesResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const [name, setName] = useState('');

    const getCategories = useCallback(() => {
        const params = {
            page: activePage,
            linesPerPage: 8,
            direction: 'DESC',
            orderBy: 'id'
        }

        setIsLoading(true);
        makeRequest({ url: '/categories', params })
            .then(response => setCategoriesResponse(response.data))
            .finally(() => {
                setIsLoading(false);
            })
    }, [activePage]);

    useEffect(() => {
        getCategories();
    }, [getCategories]);

    const handleCreate = () => {
        history.push('/admin/categories/create');
    }

    const onRemove = (productId: number) => {
        const confirm = window.confirm('Deseja realmente excluir esta categoria?');

        if (confirm) {
            makePrivateRequest({ url: `/categories/${productId}`, method: 'DELETE' })
                .then(() => {
                    toast.info('Categoria excluída com sucesso!');
                    getCategories();
                })
                .catch(() => {
                    toast.error('Erro ao excluir categoria!');
                });
        }
    }

    const handleChangeName = (name: string) => {
        setActivePage(0);
        setName(name);
    }

    const clearFilters = () => {
        setActivePage(0);
        setName('');
    }

    return (
        <div>
            <div>
                <button className="btn btn-primary btn-lg" onClick={handleCreate}>
                    ADICIONAR
                </button>
            </div>
            <div>
                {isLoading ? <CardLoader /> : (
                    categoriesResponse?.content.map(category => (
                        <Card category={category} key={category.id} onRemove={onRemove} />
                    ))
                )}
            </div>
            {categoriesResponse && (
                <Pagination
                    totalPages={categoriesResponse.totalPages}
                    activePage={activePage}
                    onChange={page => setActivePage(page)}
                />
            )}
        </div>
    )
}

export default List;