import { useState } from 'react';
import Input from '../Form/Input';
import SubmitButton from '../Form/SubmitButton';
import '../Project/ProjectForm.css';

const ServiceForm = ({ handleSubmit, textBtn, projectData }) => {
    const [service, setService] = useState();

    const submit = (e) => {
        e.preventDefault();
        projectData.services.push(service);
        handleSubmit(projectData);
    }

    const handleChange = (e) => {
        setService({ ...service, [e.target.name]: e.target.value });
    }

    return (
        <form className='container__form' onSubmit={ submit }>
            <Input
                type='text'
                text='Serviço'
                name='name'
                placeholder='Nome do serviço detalhado'
                handleOnChange={ handleChange }
            />

            <Input
                type='number'
                text='Custo'
                name='cost'
                placeholder='Valor total do serviço'
                handleOnChange={ handleChange }
            />

            <Input
                type='description'
                text='Descrição'
                name='description'
                placeholder=''
                handleOnChange={ handleChange }
            />

            <SubmitButton text={ textBtn } />
        </form>
    ); 
}

export default ServiceForm;