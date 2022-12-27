import React, { useState } from 'react';
import CollectionMessage from './CollectionMessage';
import Message from './Message';

type Props = {};

const HomePage = (props: Props) => {
    const [updateList, setUpdateList] = useState(false);

    const updateListMessage = (value) => {
        setUpdateList(value);
    };

    return (
        <div>
            <Message updateListMessage={updateListMessage} />
            <CollectionMessage
                updateList={updateList}
                updateListMessage={updateListMessage}
            />
        </div>
    );
};
export default HomePage;
