import './Loading.css';

import loading from '../../../images/loading.svg';

const Loading = () => {
    return (
        <div className="container__loading">
            <img src={ loading } alt="Loading" />
        </div>
    );
}

export default Loading;