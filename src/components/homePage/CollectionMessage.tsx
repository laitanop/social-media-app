import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import moment from 'moment';
import { timePost } from './helper';
type Props = {};

const CollectionMessage = (props: Props) => {
    const [user, loading, error] = useAuthState(auth);
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
    });

    return (
        <div>
            {messageList.map((message) => {
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
