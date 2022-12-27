import { useState, useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db, storage } from '../../firebase';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { addDoc, collection } from 'firebase/firestore';
import {
    Button,
    Fab,
    ButtonGroup,
    Avatar,
    Divider,
    Tooltip,
} from '@mui/material';

import styles from '../../../styles/Message.module.css';
import FilePreviewer from './FilePreviewer';

type Props = {
    updateListMessage: (boolean) => void;
};

const Message = ({ updateListMessage }: Props) => {
    const [user] = useAuthState(auth);
    const [text, setText] = useState('');
    const [file, setFile] = useState(null);

    const messageCollectionRef = collection(db, 'message');
    let filePickerRef = useRef(null);
    const createMessage = async () => {
        try {
            if (file) {
                const storageRef = ref(storage, `files/${file.name}`);
                const uploadTask = uploadBytesResumable(storageRef, file);

                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        const progress = Math.round(
                            (snapshot.bytesTransferred / snapshot.totalBytes) *
                                100
                        );
                    },
                    (error) => {
                        alert(error);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(
                            (downloadURL) => {
                                addDoc(messageCollectionRef, {
                                    text,
                                    author: {
                                        name: user.displayName,
                                        uid: user.uid,
                                    },
                                    date: Date.now(),
                                    image:
                                        file.type.includes('image') &&
                                        downloadURL,
                                    video:
                                        file.type.includes('video') &&
                                        downloadURL,
                                });
                                updateListMessage(true);
                                resetMessage();
                            }
                        );
                    }
                );
            } else {
                await addDoc(messageCollectionRef, {
                    text,
                    author: { name: user.displayName, uid: user.uid },
                    date: Date.now(),
                    image: false,
                    video: false,
                });
                resetMessage();
            }
        } catch (err) {
            console.log(err);
        }
        updateListMessage(true);
    };

    const resetMessage = () => {
        setText('');
        setFile(null);
    };

    const handleSelectFile = (file) => {
        setFile(file);
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
                <FilePreviewer
                    handleSelectFile={handleSelectFile}
                    file={file}
                    filePickerRef={filePickerRef}
                />
                <Divider />
                <ButtonGroup className={styles.tweetBox__GroupButton}>
                    <Tooltip title="Media">
                        <Fab
                            onClick={() => filePickerRef.current.click()}
                            color="primary"
                            aria-label="add"
                            className={styles.tweetBox__imageButton}
                        >
                            <ImageOutlinedIcon />
                        </Fab>
                    </Tooltip>
                    <Button
                        disabled={text.length === 0}
                        onClick={createMessage}
                        className={styles.tweetBox__tweetButton}
                    >
                        Tweet
                    </Button>
                </ButtonGroup>
            </form>
        </div>
    );
};

export default Message;
