import './Styles/Projects.css';

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Loading from '../Layout/Loading/Loading';
import Message from '../Layout/Message/Message';
import LinkButton from '../LinkButton/LinkButton';
import Card from '../Project/Card/Card';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [projectMessage, setProjectMessage] = useState('');

    const location = useLocation();
    let message = '';

    if(location.state) {
        message = location.state.message;
    }

    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:5000/projects', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then((res) => res.json())
            .then((data) => {
                setProjects(data);
                setLoading(true);
            })
            .catch((err) => console.log(err));
        }, 2000);
    }, []);

    const removeProject = (id) => {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json())
        .then(() => {
            setProjects(projects.filter((project) => project.id !== id));
            setProjectMessage('Projeto excluído com sucesso!');
        })
        .catch((err) => console.log(err));
    }

    return (
        <section className="container__projects">
            { message && <Message type='success' msg={ message } /> }
            { projectMessage && <Message type='success' msg={ projectMessage } /> }
            
            <div className='projects__option'>
                <h1>Meus projetos</h1>
                <LinkButton to='/newproject' text='Novo projeto' />
            </div>

            <div className='container__cards'>
                { 
                    !loading && <Loading /> 
                }
                {
                    projects.length > 0 &&
                    projects.map((project) => {
                        return (
                            <Card 
                                key={ project.id }
                                id={ project.id }
                                name={ project.name } 
                                budget={ project.budget } 
                                category={ project.category.id }
                                handleRemove={ removeProject }
                            />
                        );
                    })
                }
                { 
                    loading && projects.length === 0 &&
                    <p>Não existe projetos cadastrados!</p>
                }
            </div>
        </section>
    );
}

export default Projects;