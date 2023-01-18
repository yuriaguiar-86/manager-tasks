import './Styles/Home.css';
import savings from '../../images/savings.svg';
import LinkButton from '../LinkButton/LinkButton';

const Home = () => {
    return (
        <section className='container__home'>
            <h1>Bem-vindo ao <span>Coins</span></h1>
            <p>Comece a gerencia os seus projetos agora mesmo.</p>

            <LinkButton to='/newproject' text='Criar Projeto' />
            <img src={ savings } alt="Coins" />
        </section>
    );
}

export default Home;