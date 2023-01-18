import { useEffect, useState } from 'react';
import Input from '../Form/Input';
import Select from '../Form/Select';
import SubmitButton from '../Form/SubmitButton';
import './ProjectForm.css';

const ProjectForm = ({ handleSubmit, text, projectData }) => {
    const [project, setProject] = useState(projectData || {});
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/categories', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json())
        .then((data) => setCategories(data))
        .catch((err) => console.log(err));
    }, []);

    const submit = (e) => {
        e.preventDefault();
        handleSubmit(project);
    }

    const handleChange = (e) => {
        setProject({ ...project, [e.target.name]: e.target.value });
    }

    const handleCategory = (e) => {
        setProject({ ...project, category: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].index
            }
        });
    }

    return (
        <form className='container__form' onSubmit={ submit }>
            <Input 
                type="text" 
                text="Nome" 
                name="name" 
                placeholder="Nome do projeto" 
                handleOnChange={ handleChange }
                value={ project.name ? project.name : '' }
            />

            <Input 
                type="number" 
                text="Orçamento do projeto" 
                name="budget" 
                placeholder="Orçamento total" 
                handleOnChange={ handleChange }
                value={ project.budget ? project.budget : '' }
            />

            <Select 
                text='Selecione a categoria' 
                name='category_id' 
                options={ categories }
                handleOnChange={ handleCategory } 
                value={ project.category ? project.category : '' }
            />

            <SubmitButton text={ text } />
        </form>
    );
}

export default ProjectForm;