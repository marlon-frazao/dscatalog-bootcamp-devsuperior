import { Role } from 'core/types/Users';
import { makePrivateRequest } from 'core/utils/request';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import AuthCard from '../Card'
import './styles.scss';

type FormState = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roles: Role[];
}

const Register = () => {
    const { register, formState: { errors }, control } = useForm<FormState>();
    const [roles, setRoles] = useState<Role[]>([]);
    const [isLoadingRoles, setIsLoadingRoles] = useState(false);

    useEffect(() => {
        setIsLoadingRoles(true);
        makePrivateRequest({ url: '/roles' })
            .then(response => setRoles(response.data.content))
            .then(response => console.log(response))
            .finally(() => setIsLoadingRoles(false))
    }, []);

    return (
        <div>
            <AuthCard title="Cadastro">
                <form className="registry-form">
                    <div className="margin-bottom-30">
                        <input
                            type="text"
                            className={`form-control input-base ${errors.firstName ? 'is-invalid' : ''}`}
                            placeholder="Nome"
                            name='firstName'
                            ref={register({ required: "Campo Requerido!" })}
                        />
                        {errors.firstName && (
                            <div className="invalid-feedback d-block">
                                {errors.firstName.message}
                            </div>
                        )}
                    </div>
                    <div className="margin-bottom-30">
                        <input
                            type="text"
                            className={`form-control input-base ${errors.lastName ? 'is-invalid' : ''}`}
                            placeholder="Sobrenome"
                            name='lastName'
                            ref={register({ required: "Campo Requerido!" })}
                        />
                        {errors.lastName && (
                            <div className="invalid-feedback d-block">
                                {errors.lastName.message}
                            </div>
                        )}
                    </div>
                    <div className="margin-bottom-30">
                        <input
                            type="email"
                            className={`form-control input-base ${errors.email ? 'is-invalid' : ''}`}
                            placeholder="Email"
                            name='email'
                            ref={register({
                                required: "Campo obrigatório", pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Email inválido"
                                }
                            })}
                        />
                        {errors.email && (
                            <div className="invalid-feedback d-block">
                                {errors.email.message}
                            </div>
                        )}
                    </div>
                    <div className="margin-bottom-30">
                        <input
                            type="password"
                            className={`form-control input-base form-control input-base ${errors.password ? 'is-invalid' : ''}`}
                            placeholder="Digite aqui a senha"
                            name='password'
                            ref={register({
                                required: "Campo obrigatório",
                                minLength: { value: 8, message: 'Senha inválida' },
                                pattern: {
                                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i,
                                    message: 'Senha inválida'
                                }
                            })}
                        />
                        {errors.password && (
                            <div className="invalid-feedback d-block">
                                {errors.password.message}
                            </div>
                        )}
                    </div>
                    <p>A sua senha deve ter pelo menos 8 caracteres e conter pelo menos uma número</p>
                    <div className="margin-bottom-30">
                        <input
                            type="password"
                            className={`form-control input-base form-control input-base ${errors.password ? 'is-invalid' : ''}`}
                            placeholder="Repita aqui a senha"
                            name='password'
                            ref={register({
                                required: "Campo obrigatório",
                                minLength: { value: 8, message: 'O campo necessita de no mínimo 8 caracters' },
                                pattern: {
                                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i,
                                    message: 'Senha inválida'
                                }
                            })}
                        />
                        {errors.password && (
                            <div className="invalid-feedback d-block">
                                {errors.password.message}
                            </div>
                        )}
                    </div>
                    <div className="margin-bottom-30">
                        <Controller
                            name="roles"
                            as={Select}
                            options={roles}
                            isLoading={isLoadingRoles}
                            getOptionLabel={(option: Role) => option.authority}
                            getOptionValue={(option: Role) => String(option.id)}
                            classNamePrefix="roles-select"
                            placeholder="Nível de permissão"
                            inputId="roles"
                            rules={{ required: true }}
                            control={control}
                            defaultValue=""
                            isMulti
                        />
                        {errors.roles && (
                            <div className="invalid-feedback d-block">
                                Campo obrigatório
                            </div>
                        )}
                    </div>
                    <div className="d-flex">
                        <button className="btn btn-outline-danger registry-btn btn-cancel">
                            Cancelar
                        </button>
                        <button className="btn btn-primary registry-btn">
                            Cadastrar
                        </button>
                    </div>
                </form>

            </AuthCard>
        </div >
    );
}

export default Register;