import './Input.css';

const Input = ({ type, text, name, placeholder, handleOnChange, value }) => {
    return (
        <div className='container__input'>
            <label htmlFor={ name }>{ text }</label>

            <input 
                autoComplete='off'
                id={ name }
                type={ type } 
                name={ name }
                value={ value }
                placeholder={ placeholder }
                onChange={ handleOnChange }
            />
        </div>
    );
}

export default Input;