import { Button } from '@mui/material';
import React from 'react';
import styles from '../../../../styles/PollMessage.module.css';
function PollMessage({ poll }) {
    return (
        <div>
            {poll.list.map((question) => (
                <Button fullWidth className={styles.pollButton}>
                    {question.question}
                </Button>
            ))}
        </div>
    );
}

export default PollMessage;
