import React, { useEffect, useState } from 'react';
import BaseForm from '../../BaseForm';
import { makePrivateRequest, makeRequest } from 'core/utils/request';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { useHistory, useParams } from 'react-router-dom';
import './styles.scss';
import { Category } from 'core/types/Product';

type FormState = {
    name: string;
    price: string;
    description: string;
    imgUrl: string;
    categories: Category[];
}

type ParamsType = {
    productId: string;
}

const Form = () => {
    const { register, handleSubmit, formState: { errors }, setValue, control } = useForm<FormState>();
    const history = useHistory();
    const { productId } = useParams<ParamsType>();
    const [isLoadingCategory, setIsLoadingCategory] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const isEditing = productId !== 'create';
    const formTitle = isEditing ? 'EDITAR PRODUTO' : 'CADASTRAR UM PRODUTO';

    useEffect(() => {
        if (isEditing) {
            makeRequest({ url: `/products/${productId}` })
                .then(response => {
                    setValue('name', response.data.name);
                    setValue('price', response.data.price);
                    setValue('description', response.data.description);
                    setValue('imgUrl', response.data.imgUrl);
                    setValue('categories', response.data.categories);
                })
        }
    }, [productId, isEditing, setValue]);

    useEffect(() => {
        setIsLoadingCategory(true);
        makeRequest({ url: '/categories' })
            .then(response => setCategories(response.data.content))
            .finally(() => setIsLoadingCategory(false));
    }, []);

    const onSubmit = (data: FormState) => {
        makePrivateRequest({
            url: isEditing ? `/products/${productId}` : '/products',
            method: isEditing ? "PUT" : "POST",
            data
        })
            .then(() => {
                toast.info('Produto salvo com sucesso!');
                history.push('/admin/products');
            })
            .catch(() => {
                toast.error('Erro ao salvar produto!');
            });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <BaseForm title={formTitle}>
                <div className="row">
                    <div className="col-6">
                        <div className="margin-bottom-30">
                            <input
                                {...register('name', {
                                    required: "Campo obrigatório",
                                    minLength: { value: 5, message: 'O campo deve ter no mínimo 5 caracteres' },
                                    maxLength: { value: 60, message: 'O campo deve ter no máximo 60 caracteres' }
                                })}
                                type="text"
                                className="form-control input-base"
                                placeholder="Nome do produto"
                            />
                            {errors.name && (
                                <div className="invalid-feedback d-block">
                                    {errors.name.message}
                                </div>
                            )}
                        </div>
                        <div className="margin-bottom-30">
                            <Controller
                                name="categories"
                                rules={{ required: true }}
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <Select
                                        closeMenuOnSelect={false}
                                        isLoading={isLoadingCategory}
                                        onChange={onChange}
                                        selected={value}
                                        options={categories}
                                        getOptionLabel={(option: Category) => option.name}
                                        getOptionValue={(option: Category) => String(option.id)}
                                        classNamePrefix="categories-select"
                                        placeholder="Categoria"
                                        isMulti
                                    />
                                )}
                            />
                            {errors.categories && (
                                <div className="invalid-feedback d-block">
                                    Campo obrigatório
                                </div>
                            )}
                        </div>
                        <div className="margin-bottom-30">
                            <input
                                {...register('price', {
                                    required: "Campo obrigatório"
                                })}
                                type="number"
                                className="form-control input-base"
                                placeholder="Preço"
                            />
                            {errors.price && (
                                <div className="invalid-feedback d-block">
                                    {errors.price.message}
                                </div>
                            )}
                        </div>
                        <div className="margin-bottom-30">
                            <input
                                {...register('imgUrl', {
                                    required: "Campo obrigatório"
                                })}
                                type="text"
                                className="form-control input-base"
                                placeholder="URL da imagem"
                            />
                            {errors.imgUrl && (
                                <div className="invalid-feedback d-block">
                                    {errors.imgUrl.message}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col-6">
                        <textarea
                            {...register('description', {
                                required: "Campo obrigatório"
                            })}
                            className="form-control input-base"
                            placeholder="Descrição"
                            cols={30}
                            rows={10}
                        />
                        {errors.description && (
                            <div className="invalid-feedback d-block">
                                {errors.description.message}
                            </div>
                        )}
                    </div>
                </div>
            </BaseForm>
        </form>
    );
}

export default Form;