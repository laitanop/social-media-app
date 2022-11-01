import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';

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
    }, []);

    return (
        <div>
            {messageList.map((message) => {
                console.log('mssage', message);
                return (
                    <Paper key={message.id}>
                        <Typography paragraph>{message.text}</Typography>
                    </Paper>
                );
            })}
        </div>
    );
};

export default CollectionMessage;
