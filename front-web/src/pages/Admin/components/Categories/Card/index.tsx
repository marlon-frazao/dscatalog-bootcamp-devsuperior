import { Category } from 'core/types/Category';
import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

type Props = {
    category: Category;
    onRemove: (categoryId: number) => void;
}

const Card = ({ category, onRemove }: Props) => {
    return (
        <div className="card-base category-card-admin">
            <div className="row">
                <div className="col-6 text-left py-2">
                    {category.name}
                </div>
                <div className="col-6 d-flex">
                    <Link
                        to={`/admin/categories/${category.id}`}
                        type="button"
                        className="btn btn-outline-secondary border-radius-10 category-btn"
                    >
                        EDITAR
                    </Link>
                    <button
                        type="button"
                        className="btn btn-outline-danger border-radius-10 category-btn margin-left-30"
                        onClick={() => onRemove(category.id)}
                    >
                        EXCLUIR
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Card;