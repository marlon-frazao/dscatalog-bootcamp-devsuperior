import { User } from 'core/types/Users';
import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

type Props = {
    user: User;
    onRemove: (userId: number) => void;
}

const Card = ({ user, onRemove }: Props) => {
    return (
        <div className="card-base user-card-admin">
            <div className="row">
                <div className="col-6 text-left py-2">
                    {`${user.firstName} ${user.lastName}`}
                </div>
                <div className="col-6 d-flex">
                    <Link
                        to={`/admin/users/${user.id}`}
                        type="button"
                        className="btn btn-outline-secondary border-radius-10 category-btn"
                    >
                        EDITAR
                    </Link>
                    <button
                        type="button"
                        className="btn btn-outline-danger border-radius-10 category-btn margin-left-30"
                        onClick={() => onRemove(user.id)}
                    >
                        EXCLUIR
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Card;