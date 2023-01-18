const Select = ({ text, name, options, handleOnChange, value }) => {
    return (
        <div className='container__input'>
            <label htmlFor={ name }>{ text }</label>

            <select name={ name } id={ name } onChange={ handleOnChange }>
                <option>Selecione uma opção...</option>
                { 
                    options &&
                    options.map((option) => {
                        return (
                            <option value={ option.name } key={ option.id }>
                                { option.name }
                            </option>
                        );
                    })
                }
            </select>
        </div>
    );
}

export default Select;