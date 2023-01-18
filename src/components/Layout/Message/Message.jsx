import './Message.css';

import { useEffect, useState } from 'react';

const Message = ({ type, msg }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if(!msg) {
            setVisible(false);
            return;
        }
        setVisible(true);

        const timer = setTimeout(() => {
            setVisible(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, [msg]);

    return (
        <>
            {
                visible && ( 
                    <div className={`message__container ${type}`}>
                        <p>{ msg }</p>
                    </div>
                )
            }
        </>
    );
}

export default Message;