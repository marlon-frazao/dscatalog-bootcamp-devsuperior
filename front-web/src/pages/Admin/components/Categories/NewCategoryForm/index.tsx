import './styles.scss';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import history from 'core/utils/history';
import { makePrivateRequest, makeRequest } from 'core/utils/request';
import BaseForm from '../../BaseForm';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

type FormState = {
    name: string;
}

type ParamsType = {
    categoryId: string;
}

const NewCategoryForm = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormState>();
    const { categoryId } = useParams<ParamsType>();
    const isEditing = categoryId !== 'create';
    const formTitle = isEditing ? 'EDITAR CATEGORIA' : 'CADASTRAR UMA CATEGORIA';

    useEffect(() => {
        if (isEditing) {
            makeRequest({ url: `/categories/${categoryId}` })
                .then(response => {
                    setValue('name', response.data.name);
                })
        }
    }, [categoryId, isEditing, setValue]);

    const onSubmit = (data: FormState) => {
        const payload = {
            ...data,
        }
        makePrivateRequest({
            url: isEditing ? `/categories/${categoryId}` : '/categories',
            method: isEditing ? "PUT" : "POST",
            data: payload
        })
            .then(() => {
                toast.info('Categoria salva com sucesso!');
                history.push('/admin/categories');
            })
            .catch(() => {
                toast.error('Erro ao salvar categoria!');
            });

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <BaseForm title={formTitle}>
                <div className="row">
                    <div className="col-9">
                        <div >
                            <input
                                ref={register({
                                    required: "Campo obrigatório"
                                })}
                                name="name"
                                type="text"
                                className="form-control input-base"
                                placeholder="Nova Categoria"
                                data-testid="name"
                            />
                            {errors.name && (
                                <div className="invalid-feedback d-block">
                                    {errors.name.message}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </BaseForm>
        </form>
    )
}

export default NewCategoryForm;