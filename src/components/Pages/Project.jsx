import { parse, v4 as uuidv4 } from 'uuid';

import './Styles/Project.css';
import '../Pages/Styles/Projects.css';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Loading from '../Layout/Loading/Loading';
import Message from '../Layout/Message/Message';
import ProjectForm from '../Project/ProjectForm';
import ServiceForm from '../Service/ServiceForm';
import ServiceCard from '../Service/ServiceCard';

const Project = () => {
    const { id } = useParams();
    const [type, setType] = useState();
    const [message, setMessage] = useState();
    const [project, setProject] = useState([]);
    const [services, setServices] = useState([]);
    const [showProject, setShowProject] = useState(false);
    const [showService, setShowService] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((res) => res.json())
            .then((data) => {
                setProject(data);
                setServices(data.services)
            })
            .catch((err) => console.log(err));
        }, 500);
    }, [id]);

    const editProject = (project) => {
        setMessage('');

        if(project.budget < project.cost) {
            setMessage('Orçamento não pode ser menor que o custo do projeto!');
            setType('error');
            return false;
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project)
        })
        .then((res) => res.json())
        .then((data) => {
            setProject(data);
            setShowProject(false);
            setMessage('Projeto atualizado com sucesso!');
            setType('success');
        })
        .catch((err) => console.log(err));
    }

    const createService = (project) => {
        setMessage('');

        const lastService = project.services[project.services.length - 1];

        lastService.id = uuidv4();

        const lastServiceCost = lastService.cost;
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

        if(newCost > parseFloat(project.budget)) {
            setMessage('Orçamento ultrapassado, verifique o valor do serviço informado!');
            setType('error');
            project.services.pop();

            return false;
        }

        project.cost = newCost;

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project)
        })
        .then((res) => res.json())
        .then(() => setShowService(false))
        .catch((err) => console.log(err));
    }

    const toggleProjectForm = () => {
        setShowProject(!showProject);
    }

    const toggleServiceForm = () => {
        setShowService(!showService);
    }

    const removeService = (id, cost) => {
        const serviceUpdate = project.services.filter((service) => service.id !== id);
        const projectUpdate = project;

        projectUpdate.services = serviceUpdate;
        projectUpdate.cost = parseFloat(projectUpdate.cost) - parseFloat(cost);

        fetch(`http://localhost:5000/projects/${projectUpdate.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projectUpdate)
        })
        .then((res) => res.json())
        .then((data) => {
            setProject(projectUpdate);
            setServices(serviceUpdate);
            setMessage('Serviço excluído com sucesso!');
            setType('success');
        })
        .catch((err) => console.log(err));
    }

    return (
        <>
            {
                project.name ? 
                (
                    <section className='container__edit'>

                        { message && <Message type={ type } msg={ message } /> }

                        <div className='project__edit__option'>
                            <h1>{ project.name }</h1>
                            <button onClick={ toggleProjectForm }>
                                { !showProject ? 'Editar projeto' : 'Fechar projeto'}
                            </button> 
                        </div>

                        { 
                            !showProject ? 
                            (
                                <div className='container__details'>
                                    <p><span>Categoria:</span> { project.category.id }</p>
                                    <p><span>Orçamento total:</span> R$ { project.budget }</p>
                                    <p><span>Orçamento usado:</span> R$ { project.cost }</p>
                                </div>
                            ) :
                            (
                                <ProjectForm 
                                    text='Editar' 
                                    projectData={ project }
                                    handleSubmit={ editProject } 
                                />
                            )
                        }

                        <div className='container__services'>
                            <div className='project__edit__option'>
                                <h2>Adicione um serviço</h2>
                                <button onClick={ toggleServiceForm }>
                                    { !showService ? 'Adicionar serviço' : 'Fechar serviço'}
                                </button> 
                            </div>
                            <div className='container__details'>
                                {
                                    showService && 
                                    <ServiceForm 
                                        handleSubmit={ createService }
                                        textBtn='Adicionar serviço'
                                        projectData={ project }
                                    />
                                }
                            </div>
                        </div>

                        <h2>Serviços</h2> 
                        <div className='container__services__list'>
                            { services.length === 0 && <p>Não existe serviços cadastrados!</p> }

                            { 
                                services.length > 0 &&
                                services.map((service) => (
                                    <ServiceCard 
                                        id={ service.id }
                                        name={ service.name }
                                        cost={ service.cost }
                                        description={ service.description }
                                        key={ service.key }
                                        handleRemove={ removeService }
                                    />
                                ))
                            }
                        </div>
                    </section>
                ) : 
                <Loading />
            }
        </>
    );
}

export default Project;