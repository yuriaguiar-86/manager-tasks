import './Styles/NewProject.css';

import ProjectForm from '../Project/ProjectForm';
import { useNavigate } from 'react-router-dom';

const NewProject = () => {
    const history = useNavigate();

    const createPost = (project) => {
        project.cost = 0;
        project.services = [];

        fetch('http://localhost:5000/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project)
        })
        .then((res) => res.json())
        .then((data) => history('/projects', { state: { message: 'Projeto criado com sucesso!' }}))
        .catch((err) => console.log(err));
    }

    return (
        <section className="container__new__project">
            <h1>Criar projeto</h1>
            <p className='subtitle'>Crie seu projeto para depois adicionar os serviços.</p>

            <ProjectForm text='Criar Projeto' handleSubmit={ createPost } />
        </section>
    );
}

export default NewProject;