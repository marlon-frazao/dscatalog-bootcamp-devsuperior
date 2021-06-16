import './styles.scss';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import history from 'core/utils/history';
import { makePrivateRequest } from 'core/utils/request';

type FormState = {
    name: string;
}

const NewCategoryForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormState>();

    const onSubmit = (data: FormState) => {
        const payload = {
            ...data,
        }
        makePrivateRequest({
            url: '/categories',
            method: "POST",
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
        <div className="card-base border-radius-10 new-category-card">
            Cadastrar uma Categoria
            <form onSubmit={handleSubmit(onSubmit)}>
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
                    <button className="btn btn-primary col-3 save-category-buttom">
                        SALVAR
                    </button>
                </div>
            </form>
        </div>
    )
}

export default NewCategoryForm;