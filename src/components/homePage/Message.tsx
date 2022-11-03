import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase';
import { addDoc, collection } from 'firebase/firestore';
import { Button, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import styles from '../../../styles/Message.module.css';
type Props = {
    postMessage: () => void;
};

const Message = ({ postMessage }: Props) => {
    const [user, loading, error] = useAuthState(auth);
    const [text, setText] = useState('');

    const messageCollectionRef = collection(db, 'message');
    const name = user && user.displayName;
    const createMessage = async () => {
        await addDoc(messageCollectionRef, {
            text,
            author: { name: user.displayName, uid: user.uid },
            date: Date.now(),
        });
        postMessage();
    };

    return (
        <div className={styles.tweetBox}>
            <form>
                <div className={styles.tweetBox__input}>
                    <Avatar src="/broken-image.jpg" />
                    <input
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="What's happening?"
                        type="text"
                    />
                </div>

                <Button
                    disabled={text.length === 0}
                    onClick={createMessage}
                    className={styles.tweetBox__tweetButton}
                >
                    Tweet
                </Button>
            </form>
        </div>
    );
};

export default Message;
