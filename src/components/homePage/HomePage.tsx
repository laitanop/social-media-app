import React, { useState } from 'react';
import CollectionMessage from './CollectionMessage';
import Message from './Message';

type Props = {};

const HomePage = (props: Props) => {
    const [loadingMessage, setLoadingMessage] = useState(false);
    const [updateList, setUpdateList] = useState(false);

    const resetLoadingMessage = () => {
        setLoadingMessage(false);
    };
    const postMessage = () => {
        setLoadingMessage(true);
    };
    const updateListMessage = (value) => {
        setUpdateList(value);
    };

    return (
        <div>
            <Message
                postMessage={postMessage}
                updateListMessage={updateListMessage}
            />
            <CollectionMessage
                loadingMessage={loadingMessage}
                resetLoadingMessage={resetLoadingMessage}
                updateList={updateList}
                updateListMessage={updateListMessage}
            />
        </div>
    );
};
export default HomePage;
