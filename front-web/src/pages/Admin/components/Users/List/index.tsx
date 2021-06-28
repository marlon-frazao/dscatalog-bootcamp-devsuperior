import { UsersResponse } from 'core/types/Users';
import { makePrivateRequest } from 'core/utils/request';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Card from '../Card';
import './styles.scss';

const List = () => {
    const history = useHistory();
    const [usersResponse, setUsersResponse] = useState<UsersResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivePage] = useState(0);
    const [name, setName] = useState('');

    const getUsers = useCallback(() => {
        const params = {
            page: activePage,
            linesPerPage: 8,
            direction: 'ASC',
            orderBy: name,
            name,
        }

        setIsLoading(true);
        makePrivateRequest({ url: '/users', params })
            .then(response => setUsersResponse(response.data))
            .finally(() => {
                setIsLoading(false);
            })
    }, [activePage, name,]);

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    const handleCreate = () => {
        history.push('/auth/register');
    }

    const onRemove = (userId: number) => {
        const confirm = window.confirm('Deseja realmente excluir este usuário?');

        if (confirm) {
            makePrivateRequest({ url: `/users/${userId}`, method: 'DELETE' })
                .then(() => {
                    toast.info('Usuário excluído com sucesso!');
                    getUsers();
                })
                .catch(() => {
                    toast.error('Erro ao excluir usuário!');
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
            <div className="d-flex justify-content-between top">
                <button className="btn btn-primary btn-lg" onClick={handleCreate}>
                    ADICIONAR
                </button>
            </div>
            <div>
                {usersResponse?.content.map(user => (
                    <Card user={user} onRemove={onRemove} key={user.id} />
                ))}
            </div>
        </div>
    );
}

export default List;