import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { addDoc, collection } from 'firebase/firestore';
import { Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
type Props = {};
const StyledName = styled(Typography)({
    color: 'black',
});
const StyledEmail = styled(Typography)({
    marginTop: '-10px',
    color: 'grey',
    fontWeight: 'normal',
    fontSize: '12px',
});

const StyledOutlinedInput = styled(OutlinedInput)({
    '& .MuiOutlinedInput-notchedOutline': {
        border: '1px solid #f5f5f5',
    },
});
const StyledButton = styled(Button)({
    backgroundColor: '#d500f9',
    color: 'white',
    marginTop: '5px',
});
const Message = (props: Props) => {
    const [user, loading, error] = useAuthState(auth);
    const [text, setText] = useState('');
    console.log('user', user);
    console.log('text', text);
    const messageCollectionRef = collection(db, 'message');

    const createMessage = async () => {
        await addDoc(messageCollectionRef, {
            text,
            author: { name: user.displayName, uid: user.uid },
            date: Date.now(),
        });
    };

    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '10px',
                }}
            >
                <Avatar src="/broken-image.jpg" />

                <div style={{ margin: '5px' }}>
                    <StyledName variant="h6" noWrap>
                        {user && user.displayName}
                    </StyledName>
                    <StyledEmail variant="subtitle2" noWrap>
                        {user && user.email}
                    </StyledEmail>
                </div>
            </div>

            <FormControl sx={{ width: '100%' }}>
                <StyledOutlinedInput
                    multiline={true}
                    maxRows={3}
                    placeholder="What's happening?"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </FormControl>
            <div style={{ textAlign: 'right' }}>
                {' '}
                <StyledButton onClick={createMessage}>create</StyledButton>
            </div>
        </div>
    );
};

export default Message;
