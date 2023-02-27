import { useState, useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db, storage } from '../../firebase';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import GifBoxOutlinedIcon from '@mui/icons-material/GifBoxOutlined';
import DnsOutlinedIcon from '@mui/icons-material/DnsOutlined';
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
import GifPage from './GifPage';
import GifPreview from './GifPreview';
import PollPage from './PollPage';

type Props = {
    updateListMessage: (boolean) => void;
};

const Message = ({ updateListMessage }: Props) => {
    const [user] = useAuthState(auth);
    const [text, setText] = useState('');
    const [file, setFile] = useState(null);
    const [openModalGif, setOpenModalGif] = useState(false);
    const [showPoll, setShowPoll] = useState(false);
    const [fileGif, setFileGif] = useState(null);

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
                    gifUrl: fileGif,
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
        setFileGif(null);
    };

    const handleSelectFile = (file) => {
        setFile(file);
    };
    const handleOpenModalGif = (mode) => {
        setOpenModalGif(mode);
    };
    const handleOShowPoll = (mode) => {
        setShowPoll(mode);
    };

    return (
        <div className={styles.tweetBox}>
            <form>
                <div className={styles.tweetBox__input}>
                    <Avatar src="/broken-image.jpg" />
                    <input
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder={
                            showPoll ? 'Ask a question...' : "What's happening?"
                        }
                        type="text"
                    />
                </div>

                <FilePreviewer
                    handleSelectFile={handleSelectFile}
                    file={file}
                    filePickerRef={filePickerRef}
                />
                <GifPreview file={fileGif} />
                {showPoll && <PollPage removePoll={() => setShowPoll(false)} />}
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
                    <Tooltip title="Gif">
                        <Fab
                            onClick={() => handleOpenModalGif(true)}
                            color="primary"
                            aria-label="add"
                            className={styles.tweetBox__imageButton}
                        >
                            <GifBoxOutlinedIcon />
                        </Fab>
                    </Tooltip>
                    <Tooltip title="Poll">
                        <Fab
                            onClick={() => handleOShowPoll(true)}
                            color="primary"
                            aria-label="add"
                            className={styles.tweetBox__imageButton}
                        >
                            <DnsOutlinedIcon />
                        </Fab>
                    </Tooltip>
                    <GifPage
                        open={openModalGif}
                        handleClose={() => handleOpenModalGif(false)}
                        handleFileGif={(file) => setFileGif(file)}
                    />
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
