import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import { timePost } from './helper';
import { orderBy } from 'lodash';
type Props = {
    loadingMessage: boolean;
    resetLoadingMessage: any;
};

const CollectionMessage = ({ loadingMessage, resetLoadingMessage }: Props) => {
    const [messageList, setMessageList] = useState([]);
    const messageCollectionRef: any = collection(db, 'message');

    useEffect(() => {
        const getMessages = async () => {
            let data = await getDocs(messageCollectionRef);

            setMessageList(
                data.docs.map((doc) => ({ ...(doc.data() as any), id: doc.id }))
            );
        };
        getMessages();
    }, []);

    if (messageList.length < 0) {
        return <div />;
    }
    const list = orderBy(messageList, ['date'], ['desc']);
    console.log('length', list.length);
    return (
        <div>
            {list.map((message) => {
                return (
                    <Paper
                        key={message.id}
                        style={{ padding: 10, marginTop: 15 }}
                    >
                        <div style={{ display: 'flex' }}>
                            <span style={{ fontWeight: 'bolder' }}>
                                {message.author.name}
                            </span>

                            <span style={{ marginLeft: 5 }}>
                                &bull; {timePost(message.date)}
                            </span>
                        </div>

                        <Typography paragraph>{message.text}</Typography>
                    </Paper>
                );
            })}
        </div>
    );
};

export default CollectionMessage;
