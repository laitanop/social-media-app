import React, { useState } from 'react';
import CollectionMessage from './CollectionMessage';
import Message from './Message';

type Props = {};

const HomePage = (props: Props) => {
    const [loadingMessage, setLoadingMessage] = useState(false);

    const resetLoadingMessage = () => {
        setLoadingMessage(false);
    };
    const postMessage = () => {
        setLoadingMessage(true);
    };

    return (
        <div>
            <Message postMessage={postMessage} />
            <CollectionMessage
                loadingMessage={loadingMessage}
                resetLoadingMessage={resetLoadingMessage}
            />
        </div>
    );
};
export default HomePage;
