import './Card.css';

import { BsPencil, BsFillTrashFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const Card = ({ id, name, budget, category, handleRemove }) => {

    const remove = (e) => {
        e.preventDefault();
        handleRemove(id);
    }

    return (
        <section className='card__container'>
            <h4>{ name }</h4>
            <p><span>Orçamento:</span> R${ budget }</p>
            <p className='category__text'>
                <span className={`${category.toLowerCase()}`}></span>{ category }
            </p>

            <div className='card__actions'>
                <Link to={`/project/${id}`}><BsPencil /> Editar</Link>
                <button onClick={ remove }><BsFillTrashFill /> Remover</button>
            </div>
        </section>
    );
}

export default Card;