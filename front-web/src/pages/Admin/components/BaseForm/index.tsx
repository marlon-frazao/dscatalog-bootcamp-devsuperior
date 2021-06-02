import React from 'react';
import { useHistory } from 'react-router-dom';
import './styles.scss';

type Props = {
    title: string;
    children: React.ReactNode;
}

const BaseForm = ({ title, children }: Props) => {
    const history = useHistory();

    const handleCancel = () => {
        history.push('../');
    }
    return (
        <div className="admin-base-form card-base border-radius-20">
            <h1 className="base-form-title">
                {title}
            </h1>
            {children}
            <div className="base-form-actions">
                <button
                    className="btn btn-outline-danger border-radius-10 mr-3"
                    onClick={handleCancel}
                >
                    CANCELAR
                </button>
                <button className="btn btn-primary">
                    SALVAR
                </button>
            </div>
        </div>
    );
}

export default BaseForm;