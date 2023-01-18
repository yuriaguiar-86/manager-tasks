import './Input.css';

const SubmitButton = ({ text }) => {
    return (
        <div>
            <button className="btn__submit">{ text }</button>
        </div>
    );
}

export default SubmitButton;