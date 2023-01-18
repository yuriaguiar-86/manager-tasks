import '../Project/Card/Card.css';

import { BsFillTrashFill } from 'react-icons/bs';

const ServiceCard = ({ id, name, cost, description, handleRemove }) => {

    const remove = (e) => {
        e.preventDefault();
        handleRemove(id, cost);
    }

    return (
        <section className='card__container'>
            <h4>{ name }</h4>
            <p><span>Custo total:</span> R${ cost }</p>
            <p>{ description }</p>

            <div className='card__actions'>
                <button onClick={ remove }><BsFillTrashFill /> Remover</button>
            </div>
        </section>
    );
}

export default ServiceCard;