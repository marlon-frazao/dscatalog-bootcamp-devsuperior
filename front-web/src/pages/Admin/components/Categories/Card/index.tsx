import { Category } from 'core/types/Category';
import React from 'react';
import './styles.scss';

type Props = {
    category: Category;
    onRemove: (categoryId: number) => void;
}

const Card = ({ category, onRemove }: Props) => {
    return (
        <div className="card-base category-card-admin">
            <div className="row">
                <div className="col-2 text-center border-right py-3">
                    {category.name}
                </div>
            </div>
        </div>
    )
}

export default Card;